import { createHash, randomInt } from "node:crypto";
import type { Payload } from "payload";

export type BookingData = {
  name: string;
  phone: string;
  email: string;
  vehicle: number | null;
  start: string;
  end: string;
  from: string;
  to: string;
  message: string;
  lang: "ar" | "en";
};

export type BookingField = keyof BookingData;
export class BookingError extends Error {
  constructor(public code: "rate" | "vehicle" | "spam") {
    super(code);
  }
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max + 1) : "");
const validDate = (s: string) => DATE.test(s) && !Number.isNaN(Date.parse(s));

/** Server-side validation of the public booking form. Returns the cleaned data or the invalid field names. */
export function validateBooking(raw: Record<string, unknown>, today = new Date()):
  | { ok: true; data: BookingData }
  | { ok: false; fields: BookingField[]; spam?: boolean } {
  // Honeypot: a hidden field real visitors never fill
  if (str(raw.website, 200)) return { ok: false, fields: [], spam: true };

  const data: BookingData = {
    name: str(raw.name, 100),
    phone: str(raw.phone, 25),
    email: str(raw.email, 200),
    vehicle: /^\d+$/.test(str(raw.vehicle, 12)) ? Number(raw.vehicle) : null,
    start: str(raw.start, 10),
    end: str(raw.end, 10),
    from: str(raw.from, 200),
    to: str(raw.to, 200),
    message: str(raw.message, 2000),
    lang: raw.lang === "en" ? "en" : "ar",
  };
  // Yesterday's date is still accepted so a visitor a few hours ahead of the server's timezone isn't rejected
  const earliest = new Date(today.getTime() - 86_400_000).toISOString().slice(0, 10);
  const bad: BookingField[] = [];
  if (data.name.length < 2 || data.name.length > 100) bad.push("name");
  if (!/^\+?[\d\s()-]{7,20}$/.test(data.phone) || data.phone.replace(/\D/g, "").length < 7) bad.push("phone");
  if (data.email && (data.email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))) bad.push("email");
  if (!validDate(data.start) || data.start < earliest) bad.push("start");
  if (data.end && (!validDate(data.end) || data.end < data.start)) bad.push("end");
  if (data.from.length < 2 || data.from.length > 200) bad.push("from");
  if (data.to.length < 2 || data.to.length > 200) bad.push("to");
  if (data.message.length > 2000) bad.push("message");
  return bad.length ? { ok: false, fields: bad } : { ok: true, data };
}

const REF_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I, easy to read over the phone
export function newReference(now = new Date()) {
  const ymd = now.toISOString().slice(2, 10).replace(/-/g, "");
  return `GW-${ymd}-${Array.from({ length: 5 }, () => REF_CHARS[randomInt(REF_CHARS.length)]).join("")}`;
}

export const hashIp = (ip: string) =>
  createHash("sha256").update(`${process.env.PAYLOAD_SECRET ?? ""}:${ip}`).digest("hex").slice(0, 32);

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const GLOBAL_RATE_MAX = 100;

/** Stores a booking request. A request is never a confirmed booking: it starts as "new" for staff to review. */
export async function createBooking(payload: Payload, data: BookingData, ip: string) {
  const ipHash = hashIp(ip);
  const recent = await payload.count({
    collection: "bookings",
    where: { and: [{ ipHash: { equals: ipHash } }, { createdAt: { greater_than: new Date(Date.now() - RATE_WINDOW_MS).toISOString() } }] },
  });
  if (recent.totalDocs >= RATE_MAX) throw new BookingError("rate");
  // Unusual site-wide volume (many addresses at once) is still stored, never refused, so a flood can't lock real
  // customers out; those requests are flagged for the owner to review and filter
  const all = await payload.count({
    collection: "bookings",
    where: { createdAt: { greater_than: new Date(Date.now() - RATE_WINDOW_MS).toISOString() } },
  });
  const suspectedSpam = all.totalDocs >= GLOBAL_RATE_MAX;

  // Snapshot of the vehicle as it was named at booking time, survives later renames or archiving
  let vehicleLabel = "";
  if (data.vehicle) {
    const v = await payload
      .findByID({ collection: "vehicles", id: data.vehicle, locale: "ar", depth: 0, disableErrors: true })
      .catch(() => null);
    if (!v || v._status !== "published" || v.bookable === false) throw new BookingError("vehicle");
    vehicleLabel = v.name;
  }

  for (let attempt = 0; ; attempt++) {
    try {
      return await payload.create({
        collection: "bookings",
        data: {
          reference: newReference(),
          status: "new",
          name: data.name,
          phone: data.phone,
          email: data.email || undefined,
          vehicle: data.vehicle ?? undefined,
          vehicleLabel,
          startDate: data.start,
          endDate: data.end || undefined,
          from: data.from,
          to: data.to,
          message: data.message || undefined,
          lang: data.lang,
          ipHash,
          suspectedSpam,
        },
        overrideAccess: true,
      });
    } catch (e) {
      // Reference collision (unique index): try a fresh one
      if (attempt < 3 && /unique|duplicate/i.test(String((e as Error).message))) continue;
      throw e;
    }
  }
}

/** Optional email to staff. Never throws: a stored booking must not fail because email did. */
export async function notifyBooking(payload: Payload, booking: { reference: string; name: string; phone: string; startDate: string; vehicleLabel?: string | null }) {
  const to = process.env.BOOKING_NOTIFY_EMAIL;
  if (!to || !process.env.SMTP_HOST) return;
  try {
    await payload.sendEmail({
      to,
      subject: `طلب حجز جديد ${booking.reference}`,
      text: [
        `رقم الطلب: ${booking.reference}`,
        `الاسم: ${booking.name}`,
        `الهاتف: ${booking.phone}`,
        `المركبة: ${booking.vehicleLabel || "-"}`,
        `التاريخ: ${booking.startDate.slice(0, 10)}`,
        `${process.env.SERVER_URL ?? ""}/admin/collections/bookings`,
      ].join("\n"),
    });
  } catch (e) {
    payload.logger.error({ err: e, msg: `Booking notification failed for ${booking.reference}` });
  }
}
