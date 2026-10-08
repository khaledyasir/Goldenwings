"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { FLEET_TIERS, WHATSAPP_LINK } from "@/lib/constants";

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
export default function InquiryForm({ initialTier }: { initialTier?: string }) {
  const [f, setF] = useState({
    name: "",
    phone: "",
    email: "",
    tier: FLEET_TIERS.find((t) => t === initialTier) ?? FLEET_TIERS[0],
    start: "",
    end: "",
    from: "",
    to: "",
    message: "",
  });
  const bind = (k: keyof typeof f) => ({
    value: f[k],
    onChange: (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value }),
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = [
      `الاسم: ${f.name}`,
      `رقم الاتصال: ${f.phone}`,
      f.email && `البريد الإلكتروني: ${f.email}`,
      `فئة الحافلة: ${f.tier}`,
      `تاريخ بداية الرحلة: ${f.start}`,
      f.end && `تاريخ نهاية الرحلة: ${f.end}`,
      `نقطة الانطلاق: ${f.from}`,
      `نقطة الوصول: ${f.to}`,
      f.message && `اكتب تعليقك: ${f.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="الاسم" wide>
          <input required className={FIELD} {...bind("name")} />
        </Field>
        <Field label="رقم الاتصال">
          <input required type="tel" dir="ltr" className={`${FIELD} text-right`} {...bind("phone")} />
        </Field>
        <Field label="البريد الإلكتروني">
          <input type="email" dir="ltr" className={`${FIELD} text-right`} {...bind("email")} />
        </Field>
        <Field label="فئة الحافلة" wide>
          <select className={FIELD} {...bind("tier")}>
            {FLEET_TIERS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="تاريخ بداية الرحلة">
          <input required type="date" className={FIELD} {...bind("start")} />
        </Field>
        <Field label="تاريخ نهاية الرحلة">
          <input type="date" min={f.start} className={FIELD} {...bind("end")} />
        </Field>
        <Field label="نقطة الانطلاق">
          <input required className={FIELD} {...bind("from")} />
        </Field>
        <Field label="نقطة الوصول">
          <input required className={FIELD} {...bind("to")} />
        </Field>
        <Field label="اكتب تعليقك" wide>
          <textarea rows={5} className={FIELD} {...bind("message")} />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-gold-dark px-10 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-gold sm:w-56"
      >
        إرسال
      </button>
      <p className="mt-4 text-sm font-semibold text-navy/70">
        *ستصلك رسالة عند تأكيد الحجز يرجى التأكد من رقم الهاتف
      </p>
    </form>
  );
}
