import Link from "next/link";
import {
  Armchair,
  ArrowLeft,
  BriefcaseMedical,
  Cctv,
  Fan,
  Lightbulb,
  PlugZap,
  Refrigerator,
  ShieldCheck,
  Snowflake,
  Toilet,
  Tv,
  Usb,
  Volume2,
  Wifi,
} from "lucide-react";
import { BOOKING_HREF, FLEET_GROUPS } from "@/lib/constants";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

// ponytail: one shared feature list for every bus tier, taken from the reference cards (VIP 30 / VIP 49), confirm per vehicle and add a per-tier override where one differs
const FEATURES = [
  { icon: Tv, text: { ar: "شاشات", en: "Screens" } },
  { icon: Wifi, text: { ar: "إنترنت", en: "Internet" } },
  { icon: Volume2, text: { ar: "نظام صوتي", en: "Sound system" } },
  { icon: Snowflake, text: { ar: "تبريد / تسخين", en: "Cooling / Heating" } },
  { icon: Fan, text: { ar: "نظام تهوية", en: "Ventilation system" } },
  { icon: Usb, text: { ar: "منفذ شاحن USB", en: "USB charging port" } },
  { icon: PlugZap, text: { ar: "قابس كهربائي 220V", en: "220V power outlet" } },
  { icon: Lightbulb, text: { ar: "إنارة", en: "Lighting" } },
  { icon: Refrigerator, text: { ar: "ثلاجة", en: "Refrigerator" } },
  { icon: Cctv, text: { ar: "كاميرات مراقبة", en: "CCTV cameras" } },
  { icon: ShieldCheck, text: { ar: "معدات الأمان والسلامة", en: "Safety and security equipment" } },
  { icon: BriefcaseMedical, text: { ar: "إسعافات أولية", en: "First aid" } },
  { icon: Toilet, text: { ar: "دورة مياه", en: "Restroom" } },
];

const CARS_GROUP = FLEET_GROUPS.length - 1;

/** Top-view seat plan in the gold line style of the reference cards: two seats, aisle, two seats per row of the bus */
function SeatMap({ seats }: { seats: number }) {
  const cols = Math.ceil(seats / 4);
  const pitch = Math.min(26, 270 / cols);
  const w = Math.min(15, pitch - 4);
  const left = 20 + (270 - cols * pitch) / 2;
  const ys = [14, 31, 54, 71];
  const dots = Array.from({ length: seats }, (_, i) => ({
    x: left + Math.floor(i / 4) * pitch,
    y: ys[i % 4],
  }));
  return (
    <svg viewBox="0 0 310 100" className="h-auto w-full" aria-hidden="true">
      <rect x="2" y="2" width="306" height="96" rx="44" className="fill-white" />
      <rect x="14" y="8" width="282" height="84" rx="14" className="fill-none stroke-gold" strokeWidth="1.2" />
      {dots.map(({ x, y }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height="13" rx="3" className="fill-none stroke-gold" strokeWidth="1" />
      ))}
    </svg>
  );
}

export default async function FleetTiers() {
  const lang = await getLang();
  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="mb-10 flex items-center justify-center gap-5">
        <span className="h-0.5 w-16 rounded-full bg-gold" />
        <h2 className="text-2xl font-extrabold text-navy lg:text-3xl">{t(lang, "الفئات", "Categories")}</h2>
        <span className="h-0.5 w-16 rounded-full bg-gold" />
      </div>

      <div className="flex flex-col gap-14">
        {FLEET_GROUPS.map(({ title, tiers }, gi) => (
          <section key={title.en}>
            <h3 className="mb-6 text-xl font-extrabold text-navy lg:text-2xl">{title[lang]}:</h3>
            <div className={`grid gap-6 ${gi === CARS_GROUP ? "sm:grid-cols-2 lg:grid-cols-4" : "lg:grid-cols-2"}`}>
              {tiers.map((name) => {
                const seats = Number(name.ar.match(/\d+/)?.[0]);
                const isCar = gi === CARS_GROUP;
                return (
                  <article key={name.ar} className="flex flex-col rounded-3xl bg-[#f4eee2] p-6 shadow-sm ring-1 ring-gold/20">
                    <header className={`flex items-center justify-between gap-4 ${isCar ? "mb-6" : ""}`}>
                      <h4 className="text-3xl font-extrabold text-gold-dark">{name[lang]}</h4>
                      {!isCar && <div className="w-48 shrink-0 sm:w-64"><SeatMap seats={seats} /></div>}
                    </header>

                    {!isCar && (
                      <ul className="mb-6 mt-5 grid gap-x-8 sm:grid-cols-2">
                        {[{ icon: Armchair, text: t(lang, `${seats} ${seats > 10 ? "مقعد" : "مقاعد"}`, `${seats} seats`) }, ...FEATURES.map((f) => ({ icon: f.icon, text: f.text[lang] }))].map(({ icon: Icon, text }) => (
                          <li key={text} className="flex items-center gap-3 border-b border-gold/20 py-3 text-sm font-semibold text-navy">
                            <Icon className="h-6 w-6 shrink-0 text-gold-dark" strokeWidth={1.4} />
                            {text}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={`${BOOKING_HREF}?tier=${encodeURIComponent(name.ar)}`}
                      className="group mt-auto flex items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold text-gold transition hover:bg-navy-light"
                    >
                      {t(lang, "احجز الآن", "Book Now")}
                      <ArrowLeft className="h-4 w-4 transition ltr:rotate-180 group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
