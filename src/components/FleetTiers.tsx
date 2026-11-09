import Image from "next/image";
import Link from "next/link";
import { Armchair, ArrowLeft } from "lucide-react";
import { editable, editableDoc, getGlobal, getSettings, listDocs, media } from "@/lib/cms";
import { iconFor } from "@/lib/icons";
import type { Amenity, Vehicle } from "@/payload-types";

export default async function FleetTiers() {
  const [page, s, categories, vehicles, ed, edDoc] = await Promise.all([
    getGlobal("fleet-page"),
    getSettings(),
    listDocs("fleet-categories"),
    listDocs("vehicles"),
    editable("fleet-page"),
    editableDoc(),
  ]);
  const seats = (n: number) => ((n > 10 ? page.seatsLabel : page.seatsLabelFew) || page.seatsLabel || "{n}").replace("{n}", String(n));

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="mb-10 flex items-center justify-center gap-5">
        <span className="h-0.5 w-16 rounded-full bg-gold" />
        <h2 className="text-2xl font-extrabold text-navy lg:text-3xl" {...ed("categoriesHeading")}>
          {page.categoriesHeading}
        </h2>
        <span className="h-0.5 w-16 rounded-full bg-gold" />
      </div>

      <div className="flex flex-col gap-14">
        {categories.map((cat) => {
          const items = vehicles.filter((v) => (typeof v.category === "object" ? v.category?.id : v.category) === cat.id);
          if (!items.length) return null;
          const compact = cat.layout === "compact";
          return (
            <section key={cat.id} {...edDoc("fleet-categories", cat.id)}>
              <h3 className="mb-6 text-xl font-extrabold text-navy lg:text-2xl">{cat.title}:</h3>
              <div className={`grid gap-6 ${compact ? "sm:grid-cols-2 lg:grid-cols-4" : "lg:grid-cols-2"}`}>
                {items.map((v: Vehicle) => {
                  const img = media(v.image);
                  const amenities = (v.amenities ?? []).filter((a): a is Amenity => typeof a === "object" && !!a);
                  return (
                    <article key={v.id} className="flex flex-col rounded-3xl bg-[#f4eee2] p-6 shadow-sm ring-1 ring-gold/20" {...edDoc("vehicles", v.id)}>
                      {!compact && img && (
                        <Image
                          src={img.src}
                          alt={v.name}
                          width={img.width}
                          height={img.height}
                          className="-mx-6 -mt-6 mb-5 w-[calc(100%+3rem)] max-w-none rounded-t-3xl"
                        />
                      )}
                      <header className={`flex items-center justify-between gap-4 ${compact ? "mb-6" : ""}`}>
                        <h4 className="text-3xl font-extrabold text-gold-dark">{v.name}</h4>
                      </header>
                      {v.description && <p className="mt-3 text-sm leading-relaxed text-navy/80">{v.description}</p>}

                      {!compact && (
                        <ul className="mb-6 mt-5 grid gap-x-8 sm:grid-cols-2">
                          {[
                            ...(v.capacity ? [{ key: "seats", Icon: Armchair, text: seats(v.capacity) }] : []),
                            ...amenities.map((a) => ({ key: String(a.id), Icon: iconFor(a.icon), text: a.name })),
                          ].map(({ key, Icon, text }) => (
                            <li key={key} className="flex items-center gap-3 border-b border-gold/20 py-3 text-sm font-semibold text-navy">
                              <Icon className="h-6 w-6 shrink-0 text-gold-dark" strokeWidth={1.4} />
                              {text}
                            </li>
                          ))}
                        </ul>
                      )}

                      {v.bookable !== false && (
                        <Link
                          href={`/booking?vehicle=${v.id}`}
                          className="group mt-auto flex items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold text-gold transition hover:bg-navy-light"
                        >
                          {s.labels?.bookNow}
                          <ArrowLeft className="h-4 w-4 transition ltr:rotate-180 group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
                        </Link>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

