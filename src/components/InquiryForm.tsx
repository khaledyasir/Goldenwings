"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { FLEET_TIERS, WHATSAPP_LINK } from "@/lib/constants";

const SERVICES = [
  "النقل السياحي",
  "نقل الموظفين",
  "النقل الدولي",
  "النقل من وإلى المطار والمعابر",
  "استفسار عام",
];
const CUSTOMER_TYPES = ["أفراد", "جهات حكومية", "شركات", "حجز من خارج الأردن", "أخرى"];
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
  const [customerType, setCustomerType] = useState(CUSTOMER_TYPES[0]);
  const [f, setF] = useState({
    service: SERVICES[0],
    name: "",
    phone: "",
    email: "",
    start: "",
    end: "",
    count: "1",
    tier: FLEET_TIERS.find((t) => t.name === initialTier)?.name ?? FLEET_TIERS[0].name,
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
      `الهاتف: ${f.phone}`,
      f.email && `البريد: ${f.email}`,
      `نوع العميل: ${customerType}`,
      `الفئة: ${f.service}`,
      `الحافلة: ${f.tier} (العدد: ${f.count})`,
      `الانطلاق: ${f.from}`,
      `الوصول: ${f.to}`,
      `من: ${f.start}${f.end ? ` إلى: ${f.end}` : ""}`,
      f.message && `تعليق: ${f.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="mb-8 flex flex-wrap gap-x-6 gap-y-3">
        <legend className="sr-only">نوع العميل</legend>
        {CUSTOMER_TYPES.map((t) => (
          <label key={t} className="flex cursor-pointer items-center gap-2 text-sm font-bold text-navy">
            <input
              type="radio"
              name="customerType"
              checked={customerType === t}
              onChange={() => setCustomerType(t)}
              className="h-5 w-5 accent-gold-dark"
            />
            {t}
          </label>
        ))}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="اسم العميل" wide>
          <input required className={FIELD} {...bind("name")} />
        </Field>
        <Field label="رقم الاتصال">
          <input required type="tel" dir="ltr" className={`${FIELD} text-right`} {...bind("phone")} />
        </Field>
        <Field label="البريد الإلكتروني">
          <input type="email" dir="ltr" className={`${FIELD} text-right`} {...bind("email")} />
        </Field>
        <Field label="تاريخ البداية">
          <input required type="date" className={FIELD} {...bind("start")} />
        </Field>
        <Field label="تاريخ النهاية">
          <input type="date" min={f.start} className={FIELD} {...bind("end")} />
        </Field>
        <Field label="عدد الحافلات">
          <input required type="number" min={1} className={FIELD} {...bind("count")} />
        </Field>
        <Field label="نوع الحافلة">
          <select className={FIELD} {...bind("tier")}>
            {FLEET_TIERS.map((t) => (
              <option key={t.name}>{t.name}</option>
            ))}
          </select>
        </Field>
        <Field label="نقطة الانطلاق">
          <input required className={FIELD} {...bind("from")} />
        </Field>
        <Field label="نقطة الوصول">
          <input required className={FIELD} {...bind("to")} />
        </Field>
        <Field label="نوع الخدمة" wide>
          <select className={FIELD} {...bind("service")}>
            {SERVICES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="اكتب تعليقك ..." wide>
          <textarea rows={5} className={FIELD} {...bind("message")} />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-gold-dark px-10 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-gold sm:w-56"
      >
        إرسال
      </button>
    </form>
  );
}
