import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: t(
      lang,
      "حجز حافلة الأجنحة الذهبية لتأجير الحافلات الأردنية",
      "Booking a Bus of Golden Wings Jordanian Bus Rental",
    ),
  };
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier } = await searchParams;
  const lang = await getLang();
  return (
    <main>
      <section className="bg-[#faf7f2] py-14 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h1 className="mb-6 text-2xl font-extrabold text-navy lg:text-3xl">{t(lang, "حجز الآن", "Book Now")}</h1>
          <InquiryForm initialTier={tier} lang={lang} />
        </div>
      </section>
    </main>
  );
}
