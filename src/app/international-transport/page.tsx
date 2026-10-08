import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bus, MapPin } from "lucide-react";
import PhotoHero from "@/components/PhotoHero";
import { BOOKING_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "النقل الدولي",
};

const SERVICES = [
  {
    title: "نقل الحجاج والمعتمرين إلى المملكة العربية السعودية",
    text: "نوفر خدمات نقل الحجاج والمعتمرين إلى السعودية لأداء مناسك الحج والعمرة، بالإضافة إلى خدمات التنقل بين المدن والمشاعر المقدسة، وفق برنامج الرحلة واحتياجات المجموعة.",
    image: "/images/intl/saudi.jpg",
    alt: "نقل الحجاج والمعتمرين إلى المملكة العربية السعودية",
  },
  {
    title: "نقل المعتمرين من سوريا إلى السعودية",
    text: "نوفر خدمات نقل المعتمرين من سوريا إلى المملكة العربية السعودية، مع تنظيم رحلات المجموعات ونقل المعتمرين إلى وجهاتهم داخل المملكة، بما في ذلك التنقل خلال برنامج العمرة والمشاعر المقدسة.",
    image: "/images/intl/syria.jpg",
    alt: "نقل المعتمرين من سوريا إلى السعودية",
  },
  {
    title: "نقل المعتمرين من لبنان إلى السعودية",
    text: "نقدم خدمات نقل المعتمرين من لبنان إلى المملكة العربية السعودية، من خلال حافلات مناسبة للمجموعات، وخدمة نقل منظمة تراعي احتياجات الرحلة منذ الانطلاق وحتى الوصول.",
    image: "/images/intl/lebanon.jpg",
    alt: "نقل المعتمرين من لبنان إلى السعودية",
  },
  {
    title: "النقل السياحي الدولي",
    text: "تقدم الأجنحة الذهبية للنقل الدولي حلول النقل السياحي الدولي بالحافلات للمجموعات السياحية بين الأردن وسوريا ولبنان",
    bold: "(خدمات نقل السياح من الأردن إلى سوريا ولبنان، نقل السياح من سوريا ولبنان إلى الأردن)",
    more: "نهدف إلى توفير تجربة سفر مريحة ومنظمة، مع حافلات مجهزة وسائقين محترفين لمرافقة المجموعات خلال رحلاتهم الدولية.",
    image: "/images/intl/tourism.jpg",
    alt: "النقل السياحي الدولي",
  },
];

const COUNTRIES = ["الأردن", "السعودية", "سوريا", "لبنان", "الضفة الغربية"];

export default function InternationalTransportPage() {
  return (
    <main>
      <PhotoHero
        image="/images/international-banner.png"
        alt="حافلة الأجنحة الذهبية قرب مطار الملكة علياء الدولي"
        objectPosition="object-[30%_center]"
        heightClass="lg:min-h-[560px] 2xl:min-h-[640px]"
        mobileAspect="2.4/1"
        title="خدمات النقل الدولي"
        subtitle="بين الأردن والسعودية وسوريا ولبنان"
        description="تقدم الأجنحة الذهبية لتأجير الحافلات خدمات النقل الدولي بالحافلات للحجاج والمعتمرين والسياح والمجموعات، مع حلول نقل منظمة ومريحة تربط بين الأردن والمملكة العربية السعودية وسوريا ولبنان، والضفة الغربية مع الاهتمام براحة الركاب وتنظيم الرحلة من نقطة الانطلاق وحتى الوصول إلى الوجهة."
      />

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 lg:px-8">
          {SERVICES.map(({ title, text, bold, more, image, alt }, i) => (
            <article
              key={title}
              className="relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-navy/10 lg:flex-row"
            >
              <span
                aria-hidden="true"
                className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-6xl font-extrabold text-navy/10 lg:block"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 p-6 lg:py-7 lg:pe-8 lg:ps-24">
                <h2 className="text-xl font-extrabold text-navy">{title}</h2>
                <p className="mt-3 text-base leading-loose text-navy/80">{text}</p>
                {bold && <p className="mt-1 text-base font-extrabold leading-loose text-navy">{bold}</p>}
                {more && <p className="mt-2 text-base leading-loose text-navy/80">{more}</p>}
              </div>

              {/* Photo on the left with a slanted gold edge and a round gold badge on the seam */}
              <div className="relative h-52 shrink-0 lg:h-auto lg:min-h-44 lg:w-[34%]">
                <div className="absolute inset-0 bg-gold lg:[clip-path:polygon(0_0,100%_0,100%_100%,12%_100%)]" />
                <div className="absolute inset-0 lg:[clip-path:polygon(0_0,100%_0,100%_100%,13.5%_100%)]">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 340px, 100vw"
                    className="object-cover"
                  />
                </div>
                <span className="absolute -bottom-0 right-3 top-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg ring-4 ring-white max-lg:bottom-3 lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-1/2">
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
                  key={c}
                  className="flex items-center gap-2 rounded-full border border-gold/60 bg-navy-light px-4 py-2 text-base font-bold"
                >
                  <MapPin className="h-4 w-4 text-gold" />
                  {c}
                </li>
              ))}
            </ul>
            <Link
              href={BOOKING_HREF}
              className="w-fit rounded-full bg-gold px-10 py-3.5 text-base font-bold text-navy shadow-lg transition hover:bg-gold-light"
            >
              احجز الآن
            </Link>
          </div>

          <div className="relative aspect-[1672/760]">
            <Image
              src="/images/intl/map.jpg"
              alt="خريطة مسارات النقل الدولي بين الأردن والسعودية وسوريا ولبنان والضفة الغربية"
              fill
              sizes="(min-width: 1280px) 770px, 100vw"
              className="object-cover"
            />
            {/* Navy fades on every edge so the map melts into the panel */}
            <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-navy to-transparent" />
            <div className="absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-navy to-transparent" />
            <div className="absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-navy to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-navy to-transparent" />
          </div>
        </div>
      </section>
    </main>
  );
}
