import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "الرحلات | الأجنحة الذهبية",
};

/** Empty for now, trips content to be added later */
export default function TripsPage() {
  return (
    <main>
      <PageHero title="الرحلات" />
    </main>
  );
}
