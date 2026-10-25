import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ValuePropsStrip from "@/components/ValuePropsStrip";
import ServiceHighlights from "@/components/ServiceHighlights";
import PartnersCarousel from "@/components/PartnersCarousel";
import MapEmbed from "@/components/MapEmbed";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: t(
      lang,
      "نقل موظفين الشركات والمؤسسات والمنشئات الصناعية",
      "Industrial Establishments, Corporations & Companies' Employee Transportation",
    ),
  };
}

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
