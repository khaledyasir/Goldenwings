import type { Metadata } from "next";
import Image from "next/image";
import { Check, Mountain, Plane } from "lucide-react";
import CtaButtons from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "نقل السياح. النقل السياحي المتخصص. نقل سياحي في الأردن",
};

const WHY = [
  "خدمة استقبال وتوصيل من وإلى المطار والمعابر الحدودية",
  "مركبات حديثة ومجهزة بأعلى المعايير",
  "فريق محترف وسائقون لديهم خبرة واسعة بالوجهات السياحية",
  "سهولة الحجز",
  "الالتزام بالمواعيد",
  "رحلات نقل مخصصة حسب الوجهة وعدد المسافرين",
];

const SECTIONS = [
  {
    number: "01",
    icon: Mountain,
    text: "السياحة الداخلية والرحلات الاستكشافية الى جميع الوجهات السياحية، والأودية، خدمات نقل سياحي متخصص لعشاق الاستكشاف وسياحة المغامرات والتخييم.",
    image: "/images/service-tourism.png",
    alt: "حافلة الأجنحة الذهبية على طريق وادي رم",
  },
  {
    number: "02",
    icon: Plane,
    text: "استقبال السياح والمجموعات السياحية من مطار الملكة علياء ونقلهم إلى الفنادق بما يضمن بداية مريحة ومنظمة لزيارتهم في الأردن، باختيارك الأجنحة الذهبية سيكون فريقنا باستقبالك واصطحابك الى وجهتك وتسهيل وصولك لتجربة مليئة بالفخامة.",
    image: "/images/international-banner.png",
    alt: "حافلة الأجنحة الذهبية قرب مطار الملكة علياء الدولي",
  },
];

export default function TourismTransportPage() {
  return (
    <main>
      {/* Full-bleed photo hero like the employee page: copy sits over the open valley on the right,
          keeping the Monastery, bus and tourists clear. On lg the photo is shifted left and solid navy fills the
          freed strip under the copy; below lg the photo stacks above the copy. */}
      <section className="relative isolate overflow-hidden bg-navy pb-16 text-white lg:pb-24">
        <div className="relative aspect-[16/10] w-full lg:absolute lg:inset-y-0 lg:-left-[14%] lg:right-[14%] lg:aspect-auto">
          <Image
            src="/images/tourism-hero.png"
            alt="حافلة الأجنحة الذهبية مع مجموعة سياحية عند البتراء"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[38%_55%]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-navy from-2% via-navy/65 via-35% to-transparent to-60% max-lg:hidden" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/60 to-transparent" />
        </div>

        <div className="relative mx-auto flex max-w-7xl px-4 py-10 lg:min-h-[640px] lg:items-center lg:px-8 2xl:min-h-[720px]">
          <div className="w-full text-center lg:w-[42%] lg:text-right">
            <h1 className="text-4xl font-extrabold drop-shadow-[0_2px_8px_rgba(10,25,47,0.8)] lg:text-[2.6rem]">
              النقل السياحي <span className="text-gold">المتخصص</span>
            </h1>
            <div className="mt-4 flex items-center justify-center gap-4 lg:justify-start">
              <p className="text-xl font-semibold text-white/90">نقل السياح والمجموعات السياحي</p>
              <span className="hidden h-0.5 w-16 shrink-0 bg-gold sm:block" />
            </div>
            <p className="mt-5 text-base leading-loose text-white/85 lg:text-lg">
              خدمة نقل سياحي متكاملة للسياح، والمجموعات السياحية، والزوار القادمين من خارج الأردن،
              من خلال فريق محترف وخبرة تمتد لأكثر من 20 عام في مجال النقل السياحي المتخصص انطلق
              معنا إلى أفضل الوجهات السياحية في الأردن.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <CtaButtons dark />
            </div>
          </div>
        </div>
      </section>

      {/* Placed right under the hero and pulled up over its edge so the list is the first thing read after the intro */}
      <section className="relative z-10 -mt-12 px-4 lg:-mt-16 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border-2 border-gold bg-white p-6 shadow-[0_30px_70px_-25px_rgba(10,25,47,0.55)] lg:p-10">
          <h2 className="mb-8 text-center text-2xl font-extrabold text-navy lg:text-3xl">
            لماذا تختار الأجنحة الذهبية للنقل السياحي؟
          </h2>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => (
              <li
                key={w}
                className="flex items-start gap-3 rounded-xl bg-gold-light/10 p-5 ring-1 ring-gold-light/50"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold">
                  <Check className="h-4 w-4 text-navy" />
                </span>
                <span className="text-base font-bold leading-relaxed text-navy">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 lg:px-8">
          {SECTIONS.map(({ number, icon: Icon, text, image, alt }) => (
            <article
              key={number}
              className="flex flex-col overflow-hidden rounded-xl bg-gradient-to-l from-white to-gray-50 shadow-sm ring-1 ring-navy/5 lg:flex-row"
            >
              <div className="flex flex-1 gap-4 p-5 sm:gap-5 sm:p-6 lg:p-8">
                <div className="flex shrink-0 flex-col items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-base font-extrabold text-white sm:h-14 sm:w-14 sm:text-xl">
                    {number}
                  </span>
                  <span className="hidden h-16 w-16 items-center justify-center rounded-full border border-navy/15 text-navy/30 sm:flex">
                    <Icon className="h-8 w-8" />
                  </span>
                </div>
                <p className="self-center text-base leading-loose text-navy/80 lg:text-lg">{text}</p>
              </div>

              {/* Photo with a slanted gold edge facing the text */}
              <div className="relative h-56 shrink-0 lg:h-auto lg:w-[38%]">
                <div className="absolute inset-0 bg-gold lg:[clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]" />
                <div className="absolute inset-0 lg:[clip-path:polygon(0_0,97.5%_0,85.5%_100%,0_100%)]">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </article>
          ))}

          <p className="mt-6 text-center text-xl font-extrabold text-gold-dark lg:text-2xl">
            سيقدم لكم فريقنا المحترف تجربة نقل لرحلة استثنائية
          </p>
        </div>
      </section>
    </main>
  );
}
