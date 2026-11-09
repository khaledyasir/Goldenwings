import Image from "next/image";
import Link from "next/link";
import { Bus, MapPin } from "lucide-react";
import PhotoHero from "@/components/PhotoHero";
import { editable, getGlobal, getSettings, media, pageMeta } from "@/lib/cms";

export const generateMetadata = () => pageMeta("international-transport");

export default async function InternationalTransportPage() {
  const [page, s, ed] = await Promise.all([getGlobal("international-transport"), getSettings(), editable("international-transport")]);
  const map = media(page.mapImage);
  return (
    <main>
      <PhotoHero
        image={media(page.hero?.image)}
        ed={ed}
        objectPosition="object-[30%_center]"
        heightClass="lg:min-h-[560px] 2xl:min-h-[640px]"
        mobileAspect="2.4/1"
        title={page.hero?.title ?? ""}
        subtitle={page.hero?.subtitle}
        description={page.hero?.description}
      />

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 lg:px-8">
          {(page.services ?? []).map((service, i) => {
            const img = media(service.image);
            return (
              <article
                key={service.id ?? i}
                className="relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-navy/10 lg:flex-row"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-6xl font-extrabold text-navy/10 lg:block ltr:left-6 ltr:right-auto"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 p-6 lg:py-7 lg:pe-8 lg:ps-24">
                  <h2 className="text-xl font-extrabold text-navy" {...ed(`services.${i}.title`)}>
                    {service.title}
                  </h2>
                  {service.text && (
                    <p className="mt-3 text-base leading-loose text-navy/80" {...ed(`services.${i}.text`)}>
                      {service.text}
                    </p>
                  )}
                  {service.bold && (
                    <p className="mt-1 text-base font-extrabold leading-loose text-navy" {...ed(`services.${i}.bold`)}>
                      {service.bold}
                    </p>
                  )}
                  {service.more && (
                    <p className="mt-2 text-base leading-loose text-navy/80" {...ed(`services.${i}.more`)}>
                      {service.more}
                    </p>
                  )}
                </div>

                {/* Photo on the left with a slanted gold edge and a round gold badge on the seam */}
                <div className="relative h-52 shrink-0 lg:h-auto lg:min-h-44 lg:w-[34%]" {...ed(`services.${i}.image`, "image")}>
                  <div className="absolute inset-0 bg-gold lg:[clip-path:polygon(0_0,100%_0,100%_100%,12%_100%)] ltr:lg:[clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]" />
                  <div className="absolute inset-0 lg:[clip-path:polygon(0_0,100%_0,100%_100%,13.5%_100%)] ltr:lg:[clip-path:polygon(0_0,100%_0,86.5%_100%,0_100%)]">
                    {img && <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 340px, 100vw" className="object-cover" />}
                  </div>
                  <span className="absolute -bottom-0 right-3 top-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg ring-4 ring-white max-lg:bottom-3 lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-1/2 ltr:lg:left-0 ltr:lg:right-auto ltr:lg:-translate-x-1/2">
                    <Bus className="h-7 w-7 text-white" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Map panel from the concept: country list and booking button on the right, the map on the left fading into the navy */}
      <section className="overflow-hidden bg-navy pb-8 text-white lg:pb-12">
        <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="flex flex-col gap-6 px-4 py-10 lg:px-8">
            <ul className="flex flex-wrap gap-3">
              {(page.countries ?? []).map((c, i) => (
                <li
                  key={c.id ?? i}
                  className="flex items-center gap-2 rounded-full border border-gold/60 bg-navy-light px-4 py-2 text-base font-bold"
                >
                  <MapPin className="h-4 w-4 text-gold" />
                  <span {...ed(`countries.${i}.name`)}>{c.name}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/booking"
              className="w-fit rounded-full bg-gold px-10 py-3.5 text-base font-bold text-navy shadow-lg transition hover:bg-gold-light"
            >
              {s.labels?.bookNow}
            </Link>
          </div>

          <div className="relative aspect-[1672/760]" {...ed("mapImage", "image")}>
            {map && <Image src={map.src} alt={map.alt} fill sizes="(min-width: 1280px) 770px, 100vw" className="object-cover" />}
            {/* Navy fades on every edge so the map melts into the panel */}
            <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-navy to-transparent ltr:w-[22%]" />
            <div className="absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-navy to-transparent ltr:w-[12%]" />
            <div className="absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-navy to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-navy to-transparent" />
          </div>
        </div>
      </section>
    </main>
  );
}
