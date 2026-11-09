import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { editable, getGlobal, media } from "@/lib/cms";
import { iconFor } from "@/lib/icons";

export default async function ServiceHighlights() {
  const [home, ed] = await Promise.all([getGlobal("home"), editable("home")]);
  return (
    <section id="services" className="scroll-mt-20 bg-white py-14">
      <h2 className="mb-8 text-center text-3xl font-bold text-navy lg:text-4xl" {...ed("servicesTitle")}>
        {home.servicesTitle}
      </h2>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-3 lg:px-6">
        {(home.services ?? []).map((service, i) => {
          const Icon = iconFor(service.icon);
          const img = media(service.image);
          return (
            <Link
              key={service.id ?? i}
              href={service.href}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-navy text-white shadow-lg ring-1 ring-navy/10 transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Photo on the card's right, dissolving into navy behind the text */}
              <div className="relative h-60 shrink-0 lg:h-72" {...ed(`services.${i}.image`, "image")}>
                {img && (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 [mask-image:linear-gradient(to_bottom,black_60%,transparent)] group-hover:scale-105"
                  />
                )}
              </div>

              <div className="relative flex flex-1 flex-col justify-between gap-5 p-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold leading-snug" {...ed(`services.${i}.title`)}>
                      {service.title}
                    </h3>
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold">
                      <Icon className="h-7 w-7 text-navy" />
                    </span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-white/80" {...ed(`services.${i}.description`)}>
                    {service.description}
                  </p>
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
