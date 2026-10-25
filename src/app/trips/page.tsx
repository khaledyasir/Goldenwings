import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, ImageIcon, Phone, User } from "lucide-react";
import PageHero from "@/components/PageHero";
import {
  ADVENTURE_TRIPS,
  PLACES,
  TOURISM_TRIPS,
  type Place,
  type Trip,
} from "@/lib/constants";
import { getLang } from "@/lib/getLang";
import { t, type Lang } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return { title: t(await getLang(), "دليل الرحلات", "Trip Guide") };
}

const CARD =
  "w-72 shrink-0 snap-start overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_50px_-20px_rgba(10,25,47,0.35)]";
const PHOTO = "relative flex aspect-[4/3] items-center justify-center bg-gray-100";

function TripCard({ image, name, date, phone, price }: Trip) {
  return (
    <article className={CARD}>
      <div className={PHOTO}>
        <Image src={image} alt={name} fill sizes="288px" className="object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold leading-snug text-navy">{name}</h3>
        <p className="mt-3 flex items-center gap-2 text-sm text-navy/70">
          <CalendarDays className="h-4 w-4 text-gold-dark" />
          {date}
        </p>
        <a href={`tel:${phone}`} dir="ltr" className="mt-2 flex items-center gap-2 text-sm text-navy/70">
          <Phone className="h-4 w-4 text-gold-dark" />
          {phone}
        </a>
        <div className="mt-4 flex items-end justify-between border-t border-navy/10 pt-4">
          <p className="text-2xl font-extrabold text-gold-dark">{price}</p>
          <User className="h-5 w-5 text-navy/60" />
        </div>
      </div>
    </article>
  );
}

function PlaceCard({ image, place, description }: Place) {
  return (
    <article className={CARD}>
      <div className={PHOTO}>
        <Image src={image} alt={place} fill sizes="288px" className="object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold leading-snug text-navy">{place}</h3>
        <p className="mt-2 text-sm leading-relaxed text-navy/70">{description}</p>
      </div>
    </article>
  );
}

/** Same card with only the field names from the document, shown until real entries are added */
function EmptyCard({ fields, lang }: { fields: string[]; lang: Lang }) {
  return (
    <article className={`${CARD} border-2 border-dashed border-gold-light shadow-none`}>
      <div className={PHOTO}>
        <ImageIcon className="h-8 w-8 text-navy/30" />
        <span className="absolute bottom-3 right-4 text-sm font-semibold text-navy/50">{t(lang, "صورة", "Image")}</span>
      </div>
      <ul className="space-y-2 p-5 text-sm font-semibold text-navy/50">
        {fields.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </article>
  );
}

function Carousel({
  title,
  children,
  empty,
  lang,
}: {
  title: string;
  children: React.ReactNode[];
  empty: string[];
  lang: Lang;
}) {
  return (
    <section className="py-8">
      <h2 className="mx-auto mb-6 max-w-7xl px-4 text-2xl font-extrabold text-navy lg:px-8 lg:text-3xl">
        {title}
      </h2>
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {children.length ? children : <EmptyCard fields={empty} lang={lang} />}
      </div>
    </section>
  );
}

const TRIP_FIELDS = {
  ar: ["اسم الرحلة", "التاريخ", "الحجز", "السعر"],
  en: ["Trip Name", "Date", "Book (Contact Number)", "Price"],
};
const TOUR_FIELDS = {
  ar: ["اسم الجولة", "التاريخ", "رقم هاتف الحجز", "السعر"],
  en: ["Tour Name", "Date", "Booking Contact Number", "Price"],
};
const PLACE_FIELDS = { ar: ["الموقع", "الوصف"], en: ["Location", "Description"] };

export default async function TripsPage() {
  const lang = await getLang();
  return (
    <main>
      <PageHero
        title={t(lang, "دليل الرحلات", "Trip Guide")}
        description={t(
          lang,
          "اكتشف في هذا الدليل خيارات متنوعة لرحلات تناسب اهتماماتك وتطلعاتك: من المغامرات والتخييم إلى الجولات السياحية الجماعية والرحلات الفردية. سواء كنت تخطط لرحلتك مسبقًا أو تبحث عن وجهة مميزة لقضاء وقت ممتع دون الحاجة إلى حجز، ستجد هنا ما يساعدك على اختيار تجربتك بكل سهولة.",
          "Discover a variety of trips tailored to your interests and preferences, from adventure and camping experiences to group sightseeing tours and individual excursions. Whether you are planning your trip in advance or looking for a special destination to enjoy without making a reservation, this guide will help you choose your experience easily.",
        )}
      />

      <div className="bg-[#f4eee2] pb-10 pt-4">
        <Carousel title={t(lang, "رحلات المغامرات والتخييم", "Adventure and Camping Trips")} empty={TRIP_FIELDS[lang]} lang={lang}>
          {ADVENTURE_TRIPS.map((t) => (
            <TripCard key={t.name + t.date} {...t} />
          ))}
        </Carousel>
        <Carousel title={t(lang, "الرحلات السياحية", "Sightseeing Tours")} empty={TOUR_FIELDS[lang]} lang={lang}>
          {TOURISM_TRIPS.map((t) => (
            <TripCard key={t.name + t.date} {...t} />
          ))}
        </Carousel>
        <Carousel title={t(lang, "الرحلات الفردية (دليل المواقع)", "Individual Trips (Destination Guide)")} empty={PLACE_FIELDS[lang]} lang={lang}>
          {PLACES.map((p) => (
            <PlaceCard key={p.place} {...p} />
          ))}
        </Carousel>
      </div>
    </main>
  );
}
