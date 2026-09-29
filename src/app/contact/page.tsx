import type { Metadata } from "next";
import { Phone, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import MapEmbed from "@/components/MapEmbed";
import { BOOKING_STEPS, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_LINK } from "@/lib/constants";

export const metadata: Metadata = {
  title: "الحجز والتواصل | الأجنحة الذهبية",
  description: "احجز حافلتك أو استفسر عن خدماتنا، أو تواصل مع الأجنحة الذهبية عبر الهاتف أو واتساب.",
};

const CONTACT_LINK =
  "flex items-center gap-3 rounded-xl border border-gold-light/40 bg-white px-5 py-4 font-semibold text-navy shadow-sm hover:border-gold";
const CONTACT_ICON = "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier } = await searchParams;
  return (
    <main>
      <PageHero
        title="الحجز والتواصل"
        description="عبّئ النموذج وسيتواصل معك فريقنا في أقرب وقت لتلبية طلبك، أو تواصل معنا مباشرة."
      />

      {/* scroll-mt clears the sticky header when jumping to #booking */}
      <section id="booking" className="scroll-mt-28 bg-[#faf7f2] py-14 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="mb-6 text-2xl font-extrabold text-navy lg:text-3xl">احجز الآن !</h2>
          <InquiryForm initialTier={tier} />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-navy">خطوات الحجز</h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BOOKING_STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-4 rounded-xl bg-gray-50 p-5 shadow-sm ring-1 ring-navy/5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-lg font-extrabold text-navy">
                  {i + 1}
                </span>
                <span className="font-semibold text-navy">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto grid max-w-3xl gap-4 px-4 sm:grid-cols-2 lg:px-8">
          <a href={PHONE_TEL} className={CONTACT_LINK} dir="ltr">
            <span className={CONTACT_ICON}>
              <Phone className="h-4 w-4 text-navy" />
            </span>
            {PHONE_DISPLAY}
          </a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={CONTACT_LINK}>
            <span className={CONTACT_ICON}>
              <MessageCircle className="h-4 w-4 text-navy" />
            </span>
            تواصل عبر واتساب
          </a>
        </div>
      </section>

      <MapEmbed />
    </main>
  );
}
