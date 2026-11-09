import PartnersGrid from "@/components/PartnersGrid";
import CtaButtons from "@/components/CtaButtons";
import { pageMeta } from "@/lib/cms";

export const generateMetadata = () => pageMeta("partners-page");

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
