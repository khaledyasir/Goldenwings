import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bus, MapPin } from "lucide-react";
import PhotoHero from "@/components/PhotoHero";
import { BOOKING_HREF } from "@/lib/constants";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return { title: t(await getLang(), "النقل الدولي", "International Transportation") };
}

const SERVICES = [
  {
    title: { ar: "نقل الحجاج والمعتمرين إلى المملكة العربية السعودية", en: "Transportation for Hajj and Umrah Pilgrims to Saudi Arabia" },
    text: {
      ar: "نوفر خدمات نقل الحجاج والمعتمرين إلى السعودية لأداء مناسك الحج والعمرة، بالإضافة إلى خدمات التنقل بين المدن والمشاعر المقدسة، وفق برنامج الرحلة واحتياجات المجموعة.",
      en: "We provide transportation services to Hajj and Umrah pilgrims traveling to Saudi Arabia to perform their religious rituals. We also arrange transportation between cities and the holy sites according to each group's itinerary and requirements.",
    },
    image: "/images/intl/saudi.jpg",
  },
  {
    title: { ar: "نقل المعتمرين من سوريا إلى السعودية", en: "Umrah Transportation from Syria to Saudi Arabia" },
    text: {
      ar: "نوفر خدمات نقل المعتمرين من سوريا إلى المملكة العربية السعودية، مع تنظيم رحلات المجموعات ونقل المعتمرين إلى وجهاتهم داخل المملكة، بما في ذلك التنقل خلال برنامج العمرة والمشاعر المقدسة.",
      en: "We provide transportation to Umrah pilgrims traveling from Syria to Saudi Arabia, organizing group journeys and transportation to destinations nationwide, including travels during their Umrah itinerary and visits to the holy sites.",
    },
    image: "/images/intl/syria.jpg",
  },
  {
    title: { ar: "نقل المعتمرين من لبنان إلى السعودية", en: "Umrah Transportation from Lebanon to Saudi Arabia" },
    text: {
      ar: "نقدم خدمات نقل المعتمرين من لبنان إلى المملكة العربية السعودية، من خلال حافلات مناسبة للمجموعات، وخدمة نقل منظمة تراعي احتياجات الرحلة منذ الانطلاق وحتى الوصول.",
      en: "We provide transportation to Umrah pilgrims traveling from Lebanon to Saudi Arabia, offering suitable buses to groups and organized transportation services tailored to the trip needs from departure to arrival.",
    },
    image: "/images/intl/lebanon.jpg",
  },
  {
    title: { ar: "النقل السياحي الدولي", en: "International Tourism Transportation" },
    text: {
      ar: "تقدم الأجنحة الذهبية للنقل الدولي حلول النقل السياحي الدولي بالحافلات للمجموعات السياحية بين الأردن وسوريا ولبنان",
      en: "Golden Wings provides international tourist bus transportation to groups traveling between Jordan, Syria and Lebanon",
    },
    bold: {
      ar: "(خدمات نقل السياح من الأردن إلى سوريا ولبنان، نقل السياح من سوريا ولبنان إلى الأردن)",
      en: "(Tourist transportation from Jordan to Syria and Lebanon, Tourist transportation from Syria and Lebanon to Jordan).",
    },
    more: {
      ar: "نهدف إلى توفير تجربة سفر مريحة ومنظمة، مع حافلات مجهزة وسائقين محترفين لمرافقة المجموعات خلال رحلاتهم الدولية.",
      en: "Our goal is to provide a comfortable and well-organized travel experience, using well-equipped buses and professional drivers to accompany groups throughout their journeys.",
    },
    image: "/images/intl/tourism.jpg",
  },
];

const COUNTRIES = [
  { ar: "الأردن", en: "Jordan" },
  { ar: "السعودية", en: "Saudi Arabia" },
  { ar: "سوريا", en: "Syria" },
  { ar: "لبنان", en: "Lebanon" },
  { ar: "الضفة الغربية", en: "West Bank" },
];

export default async function InternationalTransportPage() {
  const lang = await getLang();
  return (
    <main>
      <PhotoHero
        image="/images/international-banner.png"
        alt={t(lang, "حافلة الأجنحة الذهبية قرب مطار الملكة علياء الدولي", "A Golden Wings bus near Queen Alia International Airport")}
        objectPosition="object-[30%_center]"
        heightClass="lg:min-h-[560px] 2xl:min-h-[640px]"
        mobileAspect="2.4/1"
        title={t(lang, "خدمات النقل الدولي", "International Transportation Services")}
        subtitle={t(lang, "بين الأردن والسعودية وسوريا ولبنان", "Between Jordan, Saudi Arabia, Syria and Lebanon")}
        description={t(
          lang,
          "تقدم الأجنحة الذهبية لتأجير الحافلات خدمات النقل الدولي بالحافلات للحجاج والمعتمرين والسياح والمجموعات، مع حلول نقل منظمة ومريحة تربط بين الأردن والمملكة العربية السعودية وسوريا ولبنان، والضفة الغربية مع الاهتمام براحة الركاب وتنظيم الرحلة من نقطة الانطلاق وحتى الوصول إلى الوجهة.",
          "Golden Wings Bus Rental provides international bus transportation services for Hajj and Umrah pilgrims, tourists and groups. We offer organized and comfortable transportation solutions connecting Jordan with Saudi Arabia, Syria, Lebanon and the West Bank, prioritizing passenger comfort and carefully coordinating every trip from departure to arrival.",
        )}
      />

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 lg:px-8">
          {SERVICES.map(({ title, text, bold, more, image }, i) => (
            <article
              key={title.en}
              className="relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-navy/10 lg:flex-row"
            >
              <span
                aria-hidden="true"
                className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-6xl font-extrabold text-navy/10 lg:block ltr:left-6 ltr:right-auto"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 p-6 lg:py-7 lg:pe-8 lg:ps-24">
                <h2 className="text-xl font-extrabold text-navy">{title[lang]}</h2>
                <p className="mt-3 text-base leading-loose text-navy/80">{text[lang]}</p>
                {bold && <p className="mt-1 text-base font-extrabold leading-loose text-navy">{bold[lang]}</p>}
                {more && <p className="mt-2 text-base leading-loose text-navy/80">{more[lang]}</p>}
              </div>

              {/* Photo on the left with a slanted gold edge and a round gold badge on the seam */}
              <div className="relative h-52 shrink-0 lg:h-auto lg:min-h-44 lg:w-[34%]">
                <div className="absolute inset-0 bg-gold lg:[clip-path:polygon(0_0,100%_0,100%_100%,12%_100%)] ltr:lg:[clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]" />
                <div className="absolute inset-0 lg:[clip-path:polygon(0_0,100%_0,100%_100%,13.5%_100%)] ltr:lg:[clip-path:polygon(0_0,100%_0,86.5%_100%,0_100%)]">
                  <Image
                    src={image}
                    alt={title[lang]}
                    fill
                    sizes="(min-width: 1024px) 340px, 100vw"
                    className="object-cover"
                  />
                </div>
                <span className="absolute -bottom-0 right-3 top-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg ring-4 ring-white max-lg:bottom-3 lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-1/2 ltr:lg:left-0 ltr:lg:right-auto ltr:lg:-translate-x-1/2">
                  <Bus className="h-7 w-7 text-white" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Map panel from the concept: country list and booking button on the right, the map on the left fading into the navy */}
      <section className="overflow-hidden bg-navy pb-8 text-white lg:pb-12">
        <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="flex flex-col gap-6 px-4 py-10 lg:px-8">
            <ul className="flex flex-wrap gap-3">
              {COUNTRIES.map((c) => (
                <li
                  key={c.en}
                  className="flex items-center gap-2 rounded-full border border-gold/60 bg-navy-light px-4 py-2 text-base font-bold"
                >
                  <MapPin className="h-4 w-4 text-gold" />
                  {c[lang]}
                </li>
              ))}
            </ul>
            <Link
              href={BOOKING_HREF}
              className="w-fit rounded-full bg-gold px-10 py-3.5 text-base font-bold text-navy shadow-lg transition hover:bg-gold-light"
            >
              {t(lang, "احجز الآن", "Book Now")}
            </Link>
          </div>

          <div className="relative aspect-[1672/760]">
            <Image
              src="/images/intl/map.jpg"
              alt={t(lang, "خريطة مسارات النقل الدولي بين الأردن والسعودية وسوريا ولبنان والضفة الغربية", "Map of international transport routes between Jordan, Saudi Arabia, Syria, Lebanon and the West Bank")}
              fill
              sizes="(min-width: 1280px) 770px, 100vw"
              className="object-cover"
            />
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
