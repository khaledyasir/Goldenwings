import Hero from "@/components/Hero";
import ValuePropsStrip from "@/components/ValuePropsStrip";
import ServiceHighlights from "@/components/ServiceHighlights";
import PartnersCarousel from "@/components/PartnersCarousel";
import MapEmbed from "@/components/MapEmbed";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiceHighlights />
      <ValuePropsStrip />
      <PartnersCarousel />
      <MapEmbed />
    </main>
  );
}
