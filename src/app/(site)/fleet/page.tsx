import PageHero from "@/components/PageHero";
import FleetTiers from "@/components/FleetTiers";
import SafetyDiagram from "@/components/SafetyDiagram";
import { editable, getGlobal, pageMeta } from "@/lib/cms";

export const generateMetadata = () => pageMeta("fleet-page");

export default async function FleetPage() {
  const [page, ed] = await Promise.all([getGlobal("fleet-page"), editable("fleet-page")]);
  return (
    <main>
      <PageHero title={page.title} ed={ed} />
      <section className="bg-gradient-to-b from-white via-gold-light/5 to-white py-16">
        <FleetTiers />
      </section>
      <section className="bg-white py-16">
        <SafetyDiagram />
      </section>
    </main>
  );
}
