import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FleetTiers from "@/components/FleetTiers";
import SafetyDiagram from "@/components/SafetyDiagram";
import ServiceIcons from "@/components/ServiceIcons";

export const metadata: Metadata = {
  title: "أسطول الأجنحة الذهبية لتأجير الحافلات الأردنية",
};

export default function FleetPage() {
  return (
    <main>
      <PageHero title="أسطول الأجنحة الذهبية لتأجير الحافلات الأردنية" />
      <section className="bg-gradient-to-b from-white via-gold-light/5 to-white py-16">
        <FleetTiers />
      </section>
      <section className="bg-white py-16">
        <SafetyDiagram />
      </section>
      <section className="bg-gray-50 py-16">
        <ServiceIcons />
      </section>
    </main>
  );
}
