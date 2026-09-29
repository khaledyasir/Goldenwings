import type { Metadata } from "next";
import Image from "next/image";
import { Bus, BusFront, Car } from "lucide-react";
import PageHero from "@/components/PageHero";
import CtaButtons from "@/components/CtaButtons";
import FleetTiers from "@/components/FleetTiers";

export const metadata: Metadata = {
  title: "أسطولنا | الأجنحة الذهبية",
  description: "فئات المركبات والحافلات الحديثة التي تعتمدها الأجنحة الذهبية في خدماتها.",
};

const FLEET = [
  {
    icon: Bus,
    title: "حافلات كبيرة",
    text: "لنقل مجموعات الموظفين والسياح بأعداد كبيرة براحة تامة.",
    image: "/images/fleet-large.png",
    alt: "حافلة كبيرة تابعة للأجنحة الذهبية على طريق ساحلي",
  },
  {
    icon: BusFront,
    title: "حافلات متوسطة",
    text: "مناسبة للرحلات والمجموعات متوسطة الحجم.",
    image: "/images/fleet-medium.png",
    alt: "حافلة متوسطة مع مجموعة عائلية عند البتراء",
  },
  {
    icon: Car,
    title: "نقل VIP",
    text: "خدمة نقل خاصة وفاخرة للضيوف والمناسبات المميزة.",
    image: "/images/fleet-vip.png",
    alt: "حافلة VIP تابعة للأجنحة الذهبية قرب المطار",
  },
];

export default function FleetPage() {
  return (
    <main>
      <PageHero
        title="أسطولنا"
        description="نطاق واسع من الحافلات الحديثة والمجهزة بأعلى معايير السلامة، لتلبية مختلف احتياجات النقل."
      />

      <section className="bg-gradient-to-b from-white via-gold-light/5 to-white py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:px-8">
          {FLEET.map(({ icon: Icon, title, text, image, alt }) => (
            <article
              key={title}
              className="group rounded-3xl bg-white shadow-[0_18px_50px_-20px_rgba(10,25,47,0.35)] ring-1 ring-navy/10 transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_60px_-18px_rgba(10,25,47,0.45)] hover:ring-gold/60"
            >
              {/* Photo runs clean and unobscured, it is the product */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.06]"
                />
              </div>

              <div className="px-6 pb-7">
                <span className="relative -mt-8 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold shadow-lg ring-4 ring-white">
                  <Icon className="h-7 w-7 text-navy" />
                </span>
                <h2 className="text-xl font-bold text-navy">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <FleetTiers />
        </div>

        <div className="mt-12 flex justify-center">
          <CtaButtons />
        </div>
      </section>
    </main>
  );
}
