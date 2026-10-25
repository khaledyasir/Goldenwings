import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FleetTiers from "@/components/FleetTiers";
import SafetyDiagram from "@/components/SafetyDiagram";
import { getLang } from "@/lib/getLang";

const TITLE = {
  ar: "أسطول الأجنحة الذهبية لتأجير الحافلات الأردنية",
  en: "Golden Wings Jordanian Bus Rental Fleet",
};

export async function generateMetadata(): Promise<Metadata> {
  return { title: TITLE[await getLang()] };
}

export default async function FleetPage() {
  const lang = await getLang();
  return (
    <main>
      <PageHero title={TITLE[lang]} />
      <section className="bg-gradient-to-b from-white via-gold-light/5 to-white py-16">
        <FleetTiers />
      </section>
      <section className="bg-white py-16">
        <SafetyDiagram />
      </section>
    </main>
  );
}
