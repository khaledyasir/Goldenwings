import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceCards from "@/components/ServiceCards";

export const metadata: Metadata = {
  title: "خدماتنا | الأجنحة الذهبية",
  description: "نقل الموظفين، النقل السياحي المتخصص، والنقل الدولي.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        title="خدماتنا"
        description="حلول نقل متكاملة تغطي نقل الموظفين، النقل السياحي المتخصص، والنقل الدولي."
      />
      <ServiceCards />
    </main>
  );
}
