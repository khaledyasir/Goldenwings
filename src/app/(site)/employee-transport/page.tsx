import PhotoHero from "@/components/PhotoHero";
import { editable, getGlobal, marked, media, pageMeta } from "@/lib/cms";
import { iconFor } from "@/lib/icons";

export const generateMetadata = () => pageMeta("employee-transport");

const NUM = "mx-1 text-3xl font-extrabold text-gold-dark lg:text-4xl";

export default async function EmployeeTransportPage() {
  const [page, ed] = await Promise.all([getGlobal("employee-transport"), editable("employee-transport")]);
  return (
    <main>
      {/* Wide photo (about 2.4:1) so the hero crops almost nothing; copy sits on the right over the open road and parking, clear of the people */}
      <PhotoHero
        image={media(page.hero?.image)}
        ed={ed}
        objectPosition="object-[62%_center]"
        heightClass="lg:min-h-[600px] 2xl:min-h-[700px]"
        mobileAspect="2.36/1"
        title={page.hero?.title ?? ""}
        bookLabel={page.hero?.bookLabel}
      />

      <section className="bg-white pt-16 lg:pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <p className="text-base leading-loose text-navy/80 lg:text-lg" {...ed("intro")}>
            {page.intro}
          </p>
          {page.stats && (
            <p
              className="mt-8 rounded-2xl border border-gold-light/60 bg-gold-light/10 px-6 py-6 text-xl font-bold leading-loose text-navy"
              {...ed("stats")}
            >
              {marked(page.stats, (n, i) => (
                <span key={i} className={NUM}>
                  {n}
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {(page.features ?? []).map((f, i) => {
            const Icon = iconFor(f.icon);
            return (
              <article
                key={f.id ?? i}
                className="group relative overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-navy/10 transition hover:-translate-y-1 hover:shadow-xl hover:ring-gold/60"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-transparent via-gold to-transparent" />
                <span className="absolute -bottom-4 left-3 select-none text-8xl font-extrabold text-gold/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-navy shadow-md ring-4 ring-gold/30 transition group-hover:bg-gold">
                  <Icon className="h-7 w-7 text-gold transition group-hover:text-navy" />
                </span>
                <p className="relative mt-5 text-base font-bold leading-loose text-navy" {...ed(`features.${i}.text`)}>
                  {f.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
