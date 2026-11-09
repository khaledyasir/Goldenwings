import Image from "next/image";
import { Check } from "lucide-react";
import CtaButtons from "@/components/CtaButtons";
import { editable, getGlobal, marked, media, pageMeta } from "@/lib/cms";
import { getLang } from "@/lib/getLang";
import { iconFor } from "@/lib/icons";

export const generateMetadata = () => pageMeta("tourism-transport");

export default async function TourismTransportPage() {
  const [page, lang, ed] = await Promise.all([getGlobal("tourism-transport"), getLang(), editable("tourism-transport")]);
  const hero = media(page.hero?.image);
  return (
    <main>
      {/* Full-bleed photo hero like the employee page: copy sits over the open valley on the right,
          keeping the Monastery, bus and tourists clear. On lg the photo is shifted left and solid navy fills the
          freed strip under the copy; below lg the photo stacks above the copy. */}
      <section className="relative isolate overflow-hidden bg-navy pb-10 text-white lg:pb-12">
        <div
          className={`relative aspect-[16/10] w-full lg:absolute lg:inset-y-0 lg:aspect-auto ${lang === "en" ? "lg:-right-[14%] lg:left-[14%]" : "lg:-left-[14%] lg:right-[14%]"}`}
          {...ed("hero.image", "image")}
        >
          {hero && <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="object-cover object-[38%_55%]" />}
          <div className="absolute inset-0 bg-gradient-to-l from-navy from-2% via-navy/65 via-35% to-transparent to-60% max-lg:hidden ltr:bg-gradient-to-r" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/60 to-transparent" />
        </div>

        <div className="relative mx-auto flex max-w-7xl px-4 py-10 lg:min-h-[640px] lg:items-center lg:px-8 2xl:min-h-[720px]">
          <div className="w-full text-center lg:w-[42%] lg:text-start">
            <h1 className="text-4xl font-extrabold drop-shadow-[0_2px_8px_rgba(10,25,47,0.8)] lg:text-[2.6rem]" {...ed("hero.title")}>
              {marked(page.hero?.title, (word, i) => (
                <span key={i} className="text-gold">
                  {word}
                </span>
              ))}
            </h1>
            <div className="mt-4 flex items-center justify-center gap-4 lg:justify-start">
              <p className="text-xl font-semibold text-white/90" {...ed("hero.subtitle")}>
                {page.hero?.subtitle}
              </p>
              <span className="hidden h-0.5 w-16 shrink-0 bg-gold sm:block" />
            </div>
            <p className="mt-5 text-base leading-loose text-white/85 lg:text-lg" {...ed("hero.description")}>
              {page.hero?.description}
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <CtaButtons dark />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 lg:px-8">
          {(page.sections ?? []).map((section, i) => {
            const Icon = iconFor(section.icon);
            const img = media(section.image);
            return (
              <article
                key={section.id ?? i}
                className="flex flex-col overflow-hidden rounded-xl bg-gradient-to-l from-white to-gray-50 shadow-sm ltr:bg-gradient-to-r ring-1 ring-navy/5 lg:flex-row"
              >
                <div className="flex flex-1 gap-4 p-5 sm:gap-5 sm:p-6 lg:p-8">
                  <div className="flex shrink-0 flex-col items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-base font-extrabold text-white sm:h-14 sm:w-14 sm:text-xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden h-16 w-16 items-center justify-center rounded-full border border-navy/15 text-navy/30 sm:flex">
                      <Icon className="h-8 w-8" />
                    </span>
                  </div>
                  <p className="self-center text-base leading-loose text-navy/80 lg:text-lg" {...ed(`sections.${i}.text`)}>
                    {section.text}
                  </p>
                </div>

                {/* Photo with a slanted gold edge facing the text */}
                <div className="relative h-56 shrink-0 lg:h-auto lg:w-[38%]" {...ed(`sections.${i}.image`, "image")}>
                  <div className="absolute inset-0 bg-gold lg:[clip-path:polygon(0_0,100%_0,88%_100%,0_100%)] ltr:lg:[clip-path:polygon(0_0,100%_0,100%_100%,12%_100%)]" />
                  <div className="absolute inset-0 lg:[clip-path:polygon(0_0,97.5%_0,85.5%_100%,0_100%)] ltr:lg:[clip-path:polygon(2.5%_0,100%_0,100%_100%,14.5%_100%)]">
                    {img && <Image src={img.src} alt={section.imageAlt || img.alt} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />}
                  </div>
                </div>
              </article>
            );
          })}

          <p className="mt-6 text-center text-xl font-extrabold text-gold-dark lg:text-2xl" {...ed("closing")}>
            {page.closing}
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border-2 border-gold bg-white p-5 shadow-lg lg:p-7">
          <h2 className="mb-5 text-center text-xl font-extrabold text-navy lg:text-2xl" {...ed("whyTitle")}>
            {page.whyTitle}
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {(page.why ?? []).map((w, i) => (
              <li key={w.id ?? i} className="flex items-start gap-3 rounded-xl bg-gold-light/10 p-3.5 ring-1 ring-gold-light/50">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold">
                  <Check className="h-3.5 w-3.5 text-navy" />
                </span>
                <span className="text-sm font-bold leading-relaxed text-navy" {...ed(`why.${i}.text`)}>
                  {w.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
