import type { Metadata } from "next";
import PartnersGrid from "@/components/PartnersGrid";
import CtaButtons from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "الشركاء",
};

export default function PartnersPage() {
  return (
    <main>
      <div className="pt-8">
        <PartnersGrid />
      </div>
      <section className="bg-white pb-20 pt-4">
        <div className="mx-auto flex max-w-2xl justify-center px-4 lg:px-8">
          <CtaButtons />
        </div>
      </section>
    </main>
  );
}
