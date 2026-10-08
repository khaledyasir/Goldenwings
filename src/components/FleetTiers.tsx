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

// ponytail: one shared feature list for every bus tier, taken from the reference cards (VIP 30 / VIP 49), confirm per vehicle and add a per-tier override where one differs
const FEATURES = [
  { icon: Tv, text: "شاشات" },
  { icon: Wifi, text: "إنترنت" },
  { icon: Volume2, text: "نظام صوتي" },
  { icon: Snowflake, text: "تبريد / تسخين" },
  { icon: Fan, text: "نظام تهوية" },
  { icon: Usb, text: "منفذ شاحن USB" },
  { icon: PlugZap, text: "قابس كهربائي 220V" },
  { icon: Lightbulb, text: "إنارة" },
  { icon: Refrigerator, text: "ثلاجة" },
  { icon: Cctv, text: "كاميرات مراقبة" },
  { icon: ShieldCheck, text: "معدات الأمان والسلامة" },
  { icon: BriefcaseMedical, text: "إسعافات أولية" },
  { icon: Toilet, text: "دورة مياه" },
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

export default function FleetTiers() {
  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="mb-10 flex items-center justify-center gap-5">
        <span className="h-0.5 w-16 rounded-full bg-gold" />
        <h2 className="text-2xl font-extrabold text-navy lg:text-3xl">الفئات</h2>
        <span className="h-0.5 w-16 rounded-full bg-gold" />
      </div>

      <div className="flex flex-col gap-14">
        {FLEET_GROUPS.map(({ title, tiers }, gi) => (
          <section key={title}>
            <h3 className="mb-6 text-xl font-extrabold text-navy lg:text-2xl">{title}:</h3>
            <div className={`grid gap-6 ${gi === CARS_GROUP ? "sm:grid-cols-2 lg:grid-cols-4" : "lg:grid-cols-2"}`}>
              {tiers.map((name) => {
                const seats = Number(name.match(/\d+/)?.[0]);
                const isCar = gi === CARS_GROUP;
                return (
                  <article key={name} className="rounded-3xl bg-[#f4eee2] p-6 shadow-sm ring-1 ring-gold/20">
                    <header className="flex items-center justify-between gap-4">
                      <h4 className="text-3xl font-extrabold text-gold-dark">{name}</h4>
                      {!isCar && <div className="w-48 shrink-0 sm:w-64"><SeatMap seats={seats} /></div>}
                    </header>

                    {!isCar && (
                      <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                        {[{ icon: Armchair, text: `${seats} ${seats > 10 ? "مقعد" : "مقاعد"}` }, ...FEATURES].map(({ icon: Icon, text }) => (
                          <li key={text} className="flex items-center gap-3 border-b border-gold/20 py-3 text-sm font-semibold text-navy">
                            <Icon className="h-6 w-6 shrink-0 text-gold-dark" strokeWidth={1.4} />
                            {text}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={`${BOOKING_HREF}?tier=${encodeURIComponent(name)}`}
                      className="group mt-6 flex items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold text-gold transition hover:bg-navy-light"
                    >
                      احجز الآن
                      <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
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
