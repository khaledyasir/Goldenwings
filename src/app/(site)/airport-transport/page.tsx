import { MapPin } from "lucide-react";
import PhotoHero from "@/components/PhotoHero";
import { editable, getGlobal, media, pageMeta } from "@/lib/cms";
import { iconFor } from "@/lib/icons";

export const generateMetadata = () => pageMeta("airport-transport");

const CARD = "rounded-2xl border border-gold-light/40 bg-gold-light/10 p-7 shadow-sm";
const BADGE = "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold shadow-md ring-4 ring-white";

export default async function AirportTransportPage() {
  const [page, ed] = await Promise.all([getGlobal("airport-transport"), editable("airport-transport")]);
  return (
    <main>
      <PhotoHero
        image={media(page.hero?.image)}
        ed={ed}
        objectPosition="object-[30%_center]"
        heightClass="lg:min-h-[560px] 2xl:min-h-[640px]"
        mobileAspect="2.4/1"
        title={page.hero?.title ?? ""}
        description={page.hero?.description}
      />

      <section className="bg-white pt-14 lg:pt-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center lg:px-8">
          <p className="text-base leading-loose text-navy/80 lg:text-lg" {...ed("intro")}>
            {page.intro}
          </p>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-16">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 lg:px-8">
          {(page.cards ?? []).map((card, i) => {
            const Icon = iconFor(card.icon);
            return (
              <article key={card.id ?? i} className={CARD}>
                <div className="flex items-center gap-4">
                  <span className={BADGE}>
                    <Icon className="h-6 w-6 text-navy" />
                  </span>
                  <h2 className="text-xl font-bold text-navy" {...ed(`cards.${i}.title`)}>
                    {card.title}
                  </h2>
                </div>
                {card.text && (
                  <p className="mt-4 text-base leading-loose text-navy/80" {...ed(`cards.${i}.text`)}>
                    {card.text}
                  </p>
                )}
                {!!card.points?.length && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {card.points.map((point, j) => (
                      <li key={point.id ?? j} className="flex items-start gap-2 text-base leading-relaxed text-navy/80">
                        <MapPin className="mt-1.5 h-4 w-4 shrink-0 text-gold-dark" />
                        <span {...ed(`cards.${i}.points.${j}.text`)}>{point.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
