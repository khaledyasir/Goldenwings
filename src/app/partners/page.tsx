import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PartnersGrid from "@/components/PartnersGrid";
import CtaButtons from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "الشراكات والعملاء | الأجنحة الذهبية",
  description: "نفخر بثقة الشركات والمؤسسات التي نتعامل معها.",
};

export default function PartnersPage() {
  return (
    <main>
      <PageHero title="الشراكات / العملاء" description="نفخر بثقة الشركات والمؤسسات التي نخدمها." />
      <PartnersGrid />
      <section className="bg-white pb-20 pt-4 text-center">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <p className="text-base text-navy/80">
            تريد أن تكون شريكنا القادم؟ يسعدنا خدمتكم.
          </p>
          <div className="mt-6 flex justify-center">
            <CtaButtons />
          </div>
        </div>
      </section>
    </main>
  );
}
