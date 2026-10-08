import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "حجز حافلة الأجنحة الذهبية لتأجير الحافلات الأردنية",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier } = await searchParams;
  return (
    <main>
      <section className="bg-[#faf7f2] py-14 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h1 className="mb-6 text-2xl font-extrabold text-navy lg:text-3xl">حجز الآن</h1>
          <InquiryForm initialTier={tier} />
        </div>
      </section>
    </main>
  );
}
