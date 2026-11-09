"use server";

import { after } from "next/server";
import { headers } from "next/headers";
import { cms } from "@/lib/cms";
import { BookingError, createBooking, notifyBooking, validateBooking, type BookingField } from "@/lib/bookings";

export type BookingState =
  | { status: "idle" }
  | { status: "ok"; reference: string }
  | { status: "error"; fields: BookingField[]; code?: "rate" | "vehicle" | "server" };

export async function submitBooking(_prev: BookingState, form: FormData): Promise<BookingState> {
  const v = validateBooking(Object.fromEntries(form));
  if (!v.ok) {
    // Bots that fill the honeypot get the same generic answer as everyone else
    return { status: "error", fields: v.fields, code: v.spam ? "server" : undefined };
  }
  const h = await headers();
  // x-real-ip is set by the hosting proxy (Vercel); the left-most X-Forwarded-For entry is client-controlled, so only
  // the right-most hop (appended by the proxy) is used as a fallback
  const ip = h.get("x-real-ip") || h.get("x-forwarded-for")?.split(",").pop()?.trim() || "unknown";
  try {
    const payload = await cms();
    const booking = await createBooking(payload, v.data, ip);
    after(() => notifyBooking(payload, booking));
    return { status: "ok", reference: booking.reference };
  } catch (e) {
    if (e instanceof BookingError) return { status: "error", fields: e.code === "vehicle" ? ["vehicle"] : [], code: e.code === "spam" ? "server" : e.code };
    console.error("Booking failed", e);
    return { status: "error", fields: [], code: "server" };
  }
}
