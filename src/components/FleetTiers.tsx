import Link from "next/link";
import {
  ArrowLeft,
  Bus,
  BusFront,
  BriefcaseMedical,
  Car,
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
import { FLEET_TIERS } from "@/lib/constants";

// ponytail: one shared feature list for every tier, taken from the client's reference cards, confirm per vehicle and add a `features` override to FLEET_TIERS where a tier differs
const FEATURES = [
  { icon: Tv, text: "شاشات" },
  { icon: Wifi, text: "إنترنت" },
  { icon: Volume2, text: "نظام صوتي" },
  { icon: Snowflake, text: "تبريد وتدفئة" },
  { icon: Fan, text: "تهوية" },
  { icon: Usb, text: "شاحن USB" },
  { icon: PlugZap, text: "قابس 220V" },
  { icon: Lightbulb, text: "إنارة" },
  { icon: Refrigerator, text: "ثلاجة" },
  { icon: Cctv, text: "كاميرات" },
  { icon: ShieldCheck, text: "أمان وسلامة" },
  { icon: BriefcaseMedical, text: "إسعافات" },
  { icon: Toilet, text: "دورة مياه" },
];

const TYPE_ICON: Record<string, typeof Bus> = { حافلة: Bus, كوستر: BusFront };

export default function FleetTiers() {
  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="mb-10 flex items-center justify-center gap-5">
        <span className="h-0.5 w-16 rounded-full bg-gold" />
        <h2 className="text-2xl font-extrabold text-navy lg:text-3xl">الفئات</h2>
        <span className="h-0.5 w-16 rounded-full bg-gold" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FLEET_TIERS.map(({ type, seats, max, name }) => {
          const Icon = TYPE_ICON[type] ?? Car;
          return (
            <article
              key={name}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-navy p-7 text-white shadow-xl ring-1 ring-gold/20 transition duration-300 hover:-translate-y-1.5 hover:ring-gold/70"
            >
              {/* Oversized seat count as a watermark, so the size of each tier reads at a glance */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-6 -left-2 select-none text-[9rem] font-black leading-none text-white/[0.04]"
              >
                {max}
              </span>
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-transparent via-gold to-transparent" />

              <header className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-bold text-white/80">{type}</p>
                  <p className="mt-1 flex items-baseline gap-2 text-gold">
                    <span className="text-5xl font-extrabold leading-none">{seats}</span>
                    <span className="text-lg font-bold">{max > 10 ? "راكب" : "ركاب"}</span>
                  </p>
                </div>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold shadow-lg">
                  <Icon className="h-7 w-7 text-navy" />
                </span>
              </header>

              <ul className="relative mt-6 grid grid-cols-4 gap-x-2 gap-y-4 border-t border-white/10 pt-6">
                {FEATURES.map(({ icon: FeatureIcon, text }) => (
                  <li key={text} className="flex flex-col items-center gap-1.5 text-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                      <FeatureIcon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                    </span>
                    <span className="text-[11px] font-medium leading-tight text-white/75">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-auto pt-7">
                <Link
                  href={`/contact?tier=${encodeURIComponent(name)}#booking`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-bold text-navy transition hover:bg-gold-light"
                >
                  احجز هذه الفئة
                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
