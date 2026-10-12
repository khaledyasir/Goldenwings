"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ENTRY_OPTIONS, WHATSAPP_LINK } from "@/lib/constants";

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

const SELECTS = [
  { key: "movement", label: "الحركة" },
  { key: "type", label: "النوع" },
  { key: "client", label: "العميل" },
  { key: "trip", label: "الرحلة" },
] as const;
const SELECTS_2 = [
  { key: "bus", label: "رقم الحافلة" },
  { key: "driver", label: "السائق" },
  { key: "authorization", label: "رقم التفويض" },
] as const;

const newCaptcha = () => ({ a: 1 + Math.floor(Math.random() * 9), b: 1 + Math.floor(Math.random() * 9) });

// ponytail: no backend yet, the entry is sent as a WhatsApp message like the booking form; swap handleSubmit for an API call when one exists. The captcha is client-side only, so it stops casual spam, not bots, move the check server-side with the API.
export default function EntryForm() {
  const [f, setF] = useState({
    movement: "",
    type: "",
    client: "",
    trip: "",
    date: "",
    bus: "",
    driver: "",
    authorization: "",
    note: "",
  });
  // Random numbers are picked after mount so server and client HTML match
  const [captcha, setCaptcha] = useState<{ a: number; b: number } | null>(null);
  const [answer, setAnswer] = useState("");
  const [wrong, setWrong] = useState(false);
  useEffect(() => setCaptcha(newCaptcha()), []);

  const bind = (k: keyof typeof f) => ({
    value: f[k],
    onChange: (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value }),
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!captcha || Number(answer) !== captcha.a + captcha.b) {
      setWrong(true);
      setAnswer("");
      setCaptcha(newCaptcha());
      return;
    }
    const labels = [...SELECTS, { key: "date", label: "التاريخ" }, ...SELECTS_2, { key: "note", label: "بيان" }] as const;
    const text = labels.map(({ key, label }) => `${label}: ${f[key]}`).join("\n");
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`, "_blank");
  }

  const select = ({ key, label }: { key: keyof typeof ENTRY_OPTIONS; label: string }) => (
    <Field key={key} label={label}>
      <select required className={FIELD} {...bind(key)}>
        <option value="" disabled>
          اختر
        </option>
        {ENTRY_OPTIONS[key].map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </Field>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        {SELECTS.map(select)}
        <Field label="التاريخ">
          <input required type="date" className={FIELD} {...bind("date")} />
        </Field>
        {SELECTS_2.map(select)}
        <Field label="بيان" wide>
          <textarea rows={4} className={FIELD} {...bind("note")} />
        </Field>
        <Field label={captcha ? `تحقق: كم ناتج ${captcha.a} + ${captcha.b} ؟` : "تحقق"} wide>
          <input
            required
            inputMode="numeric"
            dir="ltr"
            className={`${FIELD} text-right`}
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setWrong(false);
            }}
          />
          {wrong && <span className="mt-1.5 block text-sm font-semibold text-red-600">الرقم غير صحيح، حاول مرة أخرى</span>}
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
