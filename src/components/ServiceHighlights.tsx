import Image from "next/image";
import Link from "next/link";
import { Plane, Mountain, Users, ArrowLeft } from "lucide-react";
import { HOME_SERVICES } from "@/lib/constants";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

const ICONS = [Users, Mountain, Plane];
const IMAGES = [
  { src: "/images/service-employee.png", ar: "حافلة نقل موظفين أمام مبنى شركة", en: "An employee transport bus in front of a company building" },
  { src: "/images/service-tourism.png", ar: "حافلة سياحية على طريق وادي رم", en: "A tourist bus on a Wadi Rum road" },
  { src: "/images/service-international.png", ar: "حافلة الأجنحة الذهبية على طريق ساحلي", en: "A Golden Wings bus on a coastal road" },
];

export default async function ServiceHighlights() {
  const lang = await getLang();
  return (
    <section id="services" className="scroll-mt-20 bg-white py-14">
      <h2 className="mb-8 text-center text-3xl font-bold text-navy lg:text-4xl">{t(lang, "خدماتنا", "Our Services")}</h2>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-3 lg:px-6">
        {HOME_SERVICES.map((service, i) => {
          const Icon = ICONS[i];
          return (
            <Link
              key={service.title.en}
              href={service.href}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-navy text-white shadow-lg ring-1 ring-navy/10 transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Photo on the card's right, dissolving into navy behind the text */}
              <div className="relative h-60 shrink-0 lg:h-72">
                <Image
                  src={IMAGES[i].src}
                  alt={IMAGES[i][lang]}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-500 [mask-image:linear-gradient(to_bottom,black_60%,transparent)] group-hover:scale-105"
                />
              </div>

              <div className="relative flex flex-1 flex-col justify-between gap-5 p-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold leading-snug">{service.title[lang]}</h3>
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold">
                      <Icon className="h-7 w-7 text-navy" />
                    </span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-white/80">{service.description[lang]}</p>
                </div>
                <span className="flex h-8 w-8 items-center justify-center self-end rounded-full border border-gold text-gold transition group-hover:bg-gold group-hover:text-navy">
                  <ArrowLeft className="h-4 w-4 ltr:rotate-180" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
