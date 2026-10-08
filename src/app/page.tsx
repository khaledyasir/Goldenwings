import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ValuePropsStrip from "@/components/ValuePropsStrip";
import ServiceHighlights from "@/components/ServiceHighlights";
import PartnersCarousel from "@/components/PartnersCarousel";
import MapEmbed from "@/components/MapEmbed";

export const metadata: Metadata = {
  title: "نقل موظفين الشركات والمؤسسات والمنشئات الصناعية",
};

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
