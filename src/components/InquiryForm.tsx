"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { FLEET_TIERS, WHATSAPP_LINK } from "@/lib/constants";
import { t, type Lang } from "@/lib/i18n";

const FIELD =
  "w-full rounded-md bg-gray-200/70 px-4 py-3.5 text-navy outline-none ring-gold transition placeholder:text-navy/50 focus:bg-white focus:ring-2";

function Field({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-semibold text-navy/70">{label}</span>
      {children}
    </label>
  );
}

// ponytail: no backend yet, the request is sent as a WhatsApp message; swap handleSubmit for an API call + confirmation SMS/email when one exists
export default function InquiryForm({ initialTier, lang }: { initialTier?: string; lang: Lang }) {
  const [f, setF] = useState({
    name: "",
    phone: "",
    email: "",
    tier: (FLEET_TIERS.find((x) => x.ar === initialTier) ?? FLEET_TIERS[0]).ar,
    start: "",
    end: "",
    from: "",
    to: "",
    message: "",
  });
  const L = {
    name: t(lang, "الاسم", "Full Name"),
    phone: t(lang, "رقم الاتصال", "Contact Number"),
    email: t(lang, "البريد الإلكتروني", "Email Address"),
    tier: t(lang, "فئة الحافلة", "Bus Category"),
    start: t(lang, "تاريخ بداية الرحلة", "Trip Start Date"),
    end: t(lang, "تاريخ نهاية الرحلة", "Trip End Date"),
    from: t(lang, "نقطة الانطلاق", "Departure Point"),
    to: t(lang, "نقطة الوصول", "Destination"),
    message: t(lang, "اكتب تعليقك", "Additional Comments"),
  };
  const bind = (k: keyof typeof f) => ({
    value: f[k],
    onChange: (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value }),
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const tier = FLEET_TIERS.find((x) => x.ar === f.tier)![lang];
    const text = [
      `${L.name}: ${f.name}`,
      `${L.phone}: ${f.phone}`,
      f.email && `${L.email}: ${f.email}`,
      `${L.tier}: ${tier}`,
      `${L.start}: ${f.start}`,
      f.end && `${L.end}: ${f.end}`,
      `${L.from}: ${f.from}`,
      `${L.to}: ${f.to}`,
      f.message && `${L.message}: ${f.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={L.name} wide>
          <input required className={FIELD} {...bind("name")} />
        </Field>
        <Field label={L.phone}>
          <input required type="tel" dir="ltr" className={`${FIELD} ${lang === "ar" ? "text-right" : ""}`} {...bind("phone")} />
        </Field>
        <Field label={L.email}>
          <input type="email" dir="ltr" className={`${FIELD} ${lang === "ar" ? "text-right" : ""}`} {...bind("email")} />
        </Field>
        <Field label={L.tier} wide>
          <select className={FIELD} {...bind("tier")}>
            {FLEET_TIERS.map((x) => (
              <option key={x.ar} value={x.ar}>
                {x[lang]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={L.start}>
          <input required type="date" className={FIELD} {...bind("start")} />
        </Field>
        <Field label={L.end}>
          <input type="date" min={f.start} className={FIELD} {...bind("end")} />
        </Field>
        <Field label={L.from}>
          <input required className={FIELD} {...bind("from")} />
        </Field>
        <Field label={L.to}>
          <input required className={FIELD} {...bind("to")} />
        </Field>
        <Field label={L.message} wide>
          <textarea rows={5} className={FIELD} {...bind("message")} />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-gold-dark px-10 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-gold sm:w-56"
      >
        {t(lang, "إرسال", "Submit Booking")}
      </button>
      <p className="mt-4 text-sm font-semibold text-navy/70">
        {t(
          lang,
          "*ستصلك رسالة عند تأكيد الحجز يرجى التأكد من رقم الهاتف",
          "*You will receive a message once your booking is confirmed. Please make sure your phone number is correct.",
        )}
      </p>
    </form>
  );
}
