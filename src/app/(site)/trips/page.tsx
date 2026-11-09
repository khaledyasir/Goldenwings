import Image from "next/image";
import { CalendarDays, ImageIcon, MessageCircle, Phone, User } from "lucide-react";
import PageHero from "@/components/PageHero";
import { editable, editableDoc, getGlobal, getSettings, listDocs, media, pageMeta } from "@/lib/cms";
import { getLang } from "@/lib/getLang";
import type { Lang } from "@/lib/i18n";
import type { Trip } from "@/payload-types";

export const generateMetadata = () => pageMeta("trips-page");

const CARD = "w-72 shrink-0 snap-start overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_50px_-20px_rgba(10,25,47,0.35)]";
const PHOTO = "relative flex aspect-[4/3] items-center justify-center bg-gray-100";

function Photo({ trip }: { trip: Trip }) {
  const img = media(trip.image);
  return (
    <div className={PHOTO}>
      {img ? <Image src={img.src} alt={img.alt || trip.name} fill sizes="288px" className="object-cover" /> : <ImageIcon className="h-8 w-8 text-navy/30" />}
    </div>
  );
}

function TripCard({ trip, lang, bookLabel }: { trip: Trip; lang: Lang; bookLabel?: string | null }) {
  const date = trip.date ? new Date(trip.date).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB", { dateStyle: "medium" }) : null;
  return (
    <>
      <Photo trip={trip} />
      <div className="p-5">
        <h3 className="text-lg font-bold leading-snug text-navy">{trip.name}</h3>
        {trip.description && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-navy/70">{trip.description}</p>}
        {(date || trip.time) && (
          <p className="mt-3 flex items-center gap-2 text-sm text-navy/70">
            <CalendarDays className="h-4 w-4 text-gold-dark" />
            {[date, trip.time].filter(Boolean).join(" · ")}
          </p>
        )}
        {trip.phone && (
          <a href={`tel:${trip.phone}`} dir="ltr" className="mt-2 flex items-center gap-2 text-sm text-navy/70">
            <Phone className="h-4 w-4 text-gold-dark" />
            {trip.phone}
          </a>
        )}
        {trip.whatsapp && (
          <a href={`https://wa.me/${trip.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" dir="ltr" className="mt-2 flex items-center gap-2 text-sm text-navy/70">
            <MessageCircle className="h-4 w-4 text-gold-dark" />
            {trip.whatsapp}
          </a>
        )}
        {trip.price != null && (
          <div className="mt-4 flex items-end justify-between border-t border-navy/10 pt-4">
            <p className="text-2xl font-extrabold text-gold-dark">
              {trip.price} {trip.currency}
            </p>
            <User className="h-5 w-5 text-navy/60" />
          </div>
        )}
        {trip.bookingUrl && trip.available !== false && (
          <a href={trip.bookingUrl} className="mt-4 block rounded-lg bg-navy px-4 py-2.5 text-center text-sm font-bold text-gold transition hover:bg-navy-light">
            {bookLabel}
          </a>
        )}
      </div>
    </>
  );
}

function PlaceCard({ trip }: { trip: Trip }) {
  return (
    <>
      <Photo trip={trip} />
      <div className="p-5">
        <h3 className="text-lg font-bold leading-snug text-navy">{trip.name}</h3>
        {trip.description && <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-navy/70">{trip.description}</p>}
      </div>
    </>
  );
}

/** Same card with only the field names, shown until real entries are published */
function EmptyCard({ fields, imageLabel }: { fields: string[]; imageLabel: string }) {
  return (
    <article className={`${CARD} border-2 border-dashed border-gold-light shadow-none`}>
      <div className={PHOTO}>
        <ImageIcon className="h-8 w-8 text-navy/30" />
        <span className="absolute bottom-3 right-4 text-sm font-semibold text-navy/50">{imageLabel}</span>
      </div>
      <ul className="space-y-2 p-5 text-sm font-semibold text-navy/50">
        {fields.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </article>
  );
}

export default async function TripsPage() {
  const [page, s, categories, trips, lang, ed, edDoc] = await Promise.all([
    getGlobal("trips-page"),
    getSettings(),
    listDocs("trip-categories"),
    listDocs("trips"),
    getLang(),
    editable("trips-page"),
    editableDoc(),
  ]);
  return (
    <main>
      <PageHero title={page.title} description={page.description} ed={ed} />

      <div className="bg-[#f4eee2] pb-10 pt-4">
        {categories.map((cat) => {
          const items = trips.filter((t) => (typeof t.category === "object" ? t.category?.id : t.category) === cat.id);
          return (
            <section key={cat.id} className="py-8">
              <h2 className="mx-auto mb-6 max-w-7xl px-4 text-2xl font-extrabold text-navy lg:px-8 lg:text-3xl" {...edDoc("trip-categories", cat.id)}>
                {cat.title}
              </h2>
              <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
                {items.length ? (
                  items.map((trip) => (
                    <article key={trip.id} className={CARD} {...edDoc("trips", trip.id)}>
                      {cat.kind === "guide" ? <PlaceCard trip={trip} /> : <TripCard trip={trip} lang={lang} bookLabel={s.labels?.bookNow} />}
                    </article>
                  ))
                ) : (
                  <EmptyCard fields={(cat.emptyHint ?? "").split("\n").filter(Boolean)} imageLabel={page.imageLabel ?? ""} />
                )}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
