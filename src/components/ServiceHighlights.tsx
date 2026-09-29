import Image from "next/image";
import Link from "next/link";
import { Plane, Mountain, Users, ArrowLeft } from "lucide-react";
import { HOME_SERVICES } from "@/lib/constants";

const ICONS = [Users, Mountain, Plane];
const IMAGES = [
  { src: "/images/service-employee.png", alt: "حافلة نقل موظفين أمام مبنى شركة" },
  { src: "/images/service-tourism.png", alt: "حافلة سياحية على طريق وادي رم" },
  { src: "/images/service-international.png", alt: "حافلة الأجنحة الذهبية على طريق ساحلي" },
];

export default function ServiceHighlights() {
  return (
    <section className="bg-white py-6">
      <h2 className="sr-only">خدماتنا</h2>
      <div className="mx-auto grid max-w-7xl gap-4 px-4 lg:grid-cols-3 lg:px-6">
        {HOME_SERVICES.map((service, i) => {
          const Icon = ICONS[i];
          // Concept shows the parenthetical as a smaller second line
          const [main, sub] = service.title.split(" (");
          return (
            <Link
              key={service.title}
              href={service.href}
              className="group relative flex flex-col overflow-hidden sm:h-48 sm:flex-row rounded-xl bg-navy text-white shadow-lg ring-1 ring-navy/10 transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Photo on the card's right, dissolving into navy behind the text */}
              <div className="relative h-44 shrink-0 sm:h-auto sm:w-[44%]">
                <Image
                  src={IMAGES[i].src}
                  alt={IMAGES[i].alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, 50vw"
                  className="object-cover transition duration-500 [mask-image:linear-gradient(to_bottom,black_60%,transparent)] sm:[mask-image:linear-gradient(to_left,black_55%,transparent)] group-hover:scale-105"
                />
              </div>

              <div className="relative flex flex-1 flex-col justify-between gap-4 py-5 ps-4 pe-5">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold leading-snug">
                      {main}
                      {sub && <span className="block text-sm font-semibold text-white/85">({sub}</span>}
                    </h3>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold">
                      <Icon className="h-6 w-6 text-navy" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{service.description}</p>
                </div>
                <span className="inline-flex items-center gap-2 self-end text-sm font-semibold">
                  اعرف المزيد
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold text-gold transition group-hover:bg-gold group-hover:text-navy">
                    <ArrowLeft className="h-4 w-4" />
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
