"use client";

import { startTransition, useActionState, useState, type ReactNode } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { submitBooking, type BookingState } from "@/app/(site)/booking/actions";
import type { Lang } from "@/lib/i18n";
import type { BookingPage } from "@/payload-types";

const FIELD =
  "w-full rounded-md bg-gray-200/70 px-4 py-3.5 text-navy outline-none ring-gold transition placeholder:text-navy/50 focus:bg-white focus:ring-2 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500";

function Field({ label, children, wide }: { label?: string | null; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-semibold text-navy/70">{label}</span>
      {children}
    </label>
  );
}

type Props = {
  lang: Lang;
  vehicles: { id: number; name: string }[];
  initialVehicle?: number;
  copy: Pick<BookingPage, "labels" | "note" | "success" | "error" | "sendWhatsapp">;
  whatsapp: string;
};

export default function InquiryForm({ lang, vehicles, initialVehicle, copy, whatsapp }: Props) {
  const [state, action, pending] = useActionState<BookingState, FormData>(submitBooking, { status: "idle" });
  const [f, setF] = useState({ start: "" });
  const L = copy.labels ?? {};
  const bad = (k: string) => state.status === "error" && state.fields.includes(k as never);
  const dirLtr = `${lang === "ar" ? "text-right" : ""}`;

  if (state.status === "ok") {
    // The request is stored; WhatsApp is an optional extra copy, like the old form
    return (
      <div role="status" className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gold/40">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold-dark" />
        <p className="mt-4 text-lg font-bold leading-loose text-navy">{(copy.success ?? "").replace("{ref}", state.reference)}</p>
        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(state.reference)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-light"
        >
          <MessageCircle className="h-4 w-4 text-gold" />
          {copy.sendWhatsapp}
        </a>
      </div>
    );
  }

  return (
    <form
      // Dispatched manually so React doesn't reset the fields when the server rejects the input
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
    >
      <input type="hidden" name="lang" value={lang} />
      {/* Honeypot for bots, hidden from people and screen readers */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={L.name} wide>
          <input name="name" required minLength={2} maxLength={100} aria-invalid={bad("name")} className={FIELD} />
        </Field>
        <Field label={L.phone}>
          <input name="phone" required type="tel" dir="ltr" maxLength={25} aria-invalid={bad("phone")} className={`${FIELD} ${dirLtr}`} />
        </Field>
        <Field label={L.email}>
          <input name="email" type="email" dir="ltr" maxLength={200} aria-invalid={bad("email")} className={`${FIELD} ${dirLtr}`} />
        </Field>
        <Field label={L.vehicle} wide>
          <select name="vehicle" defaultValue={initialVehicle ?? vehicles[0]?.id} aria-invalid={bad("vehicle")} className={FIELD}>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label={L.start}>
          <input
            name="start"
            required
            type="date"
            aria-invalid={bad("start")}
            className={FIELD}
            value={f.start}
            onChange={(e) => setF({ start: e.target.value })}
          />
        </Field>
        <Field label={L.end}>
          <input name="end" type="date" min={f.start} aria-invalid={bad("end")} className={FIELD} />
        </Field>
        <Field label={L.from}>
          <input name="from" required minLength={2} maxLength={200} aria-invalid={bad("from")} className={FIELD} />
        </Field>
        <Field label={L.to}>
          <input name="to" required minLength={2} maxLength={200} aria-invalid={bad("to")} className={FIELD} />
        </Field>
        <Field label={L.message} wide>
          <textarea name="message" rows={5} maxLength={2000} className={FIELD} />
        </Field>
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-4 text-sm font-semibold text-red-600">
          {copy.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-md bg-gold-dark px-10 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-gold disabled:opacity-60 sm:w-56"
      >
        {L.submit}
      </button>
      <p className="mt-4 text-sm font-semibold text-navy/70">{copy.note}</p>
    </form>
  );
}
