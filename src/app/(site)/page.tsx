import Hero from "@/components/Hero";
import ValuePropsStrip from "@/components/ValuePropsStrip";
import ServiceHighlights from "@/components/ServiceHighlights";
import PartnersCarousel from "@/components/PartnersCarousel";
import MapEmbed from "@/components/MapEmbed";
import { pageMeta } from "@/lib/cms";

export const generateMetadata = () => pageMeta("home");

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiceHighlights />
      <PartnersCarousel />
      <ValuePropsStrip />
      <MapEmbed />
    </main>
  );
}
