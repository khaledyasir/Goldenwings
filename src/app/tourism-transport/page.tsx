import type { Metadata } from "next";
import Image from "next/image";
import { Bus, Mountain, Plane, ShieldCheck, Users } from "lucide-react";
import CtaButtons from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "النقل السياحي المتخصص | الأجنحة الذهبية",
  description:
    "نقل سياحي متكامل للسياح والمجموعات السياحية والزوار القادمين من خارج الأردن.",
};

const HIGHLIGHTS = [
  { icon: ShieldCheck, title: "راحة وأمان", text: "في كل رحلة" },
  { icon: Users, title: "مجموعات سياحية", text: "من جميع أنحاء العالم" },
  { icon: Mountain, title: "وجهات سياحية", text: "مميزة" },
];

const SECTIONS = [
  {
    number: "01",
    icon: Bus,
    title: "نقل السياح والمجموعات السياحية",
    text: "نقدم حلول نقل سياحي متكاملة للسياح، والمجموعات السياحية، والزوار القادمين من خارج الأردن، من خلال فريق محترف وخبرة تمتد لأكثر من 20 عام في مجال النقل السياحي المتخصص.",
    note: "انطلق معنا إلى أفضل الوجهات السياحية في الأردن.",
    image: "/images/fleet-large.png",
    alt: "حافلة سياحية كبيرة تابعة للأجنحة الذهبية",
  },
  {
    number: "02",
    icon: Mountain,
    title: "السياحة الداخلية والرحلات الاستكشافية",
    text: "نوفر خدمات نقل سياحي متخصص إلى جميع الوجهات السياحية والأودية، لتلبية احتياجات عشاق الاستكشاف وسياحة المغامرات والتخييم.",
    note: "استمتع برحلة مريحة وآمنة إلى أجمل ما في الأردن.",
    image: "/images/service-tourism.png",
    alt: "حافلة الأجنحة الذهبية على طريق وادي رم",
  },
  {
    number: "03",
    icon: Plane,
    title: "استقبال السياح من مطار الملكة علياء",
    text: "نقدم خدمة استقبال السياح والمجموعات السياحية من مطار الملكة علياء الدولي ونقلهم إلى الفنادق، بما يضمن بداية مريحة ومنظمة لزيارتهم في الأردن.",
    note: "باختيارك الأجنحة الذهبية سيكون فريقنا باستقبالك واصطحابك إلى وجهتك، وتسهيل وصولك لتجربة مليئة بالفخامة.",
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
      <section className="relative isolate overflow-hidden bg-navy text-white">
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
          <p className="absolute bottom-8 left-[calc(14%+2.5rem)] hidden text-3xl font-bold italic leading-snug drop-shadow-[0_2px_6px_rgba(10,25,47,0.8)] lg:block">
            الأردن
            <br />
            بانتظارك …
            <span className="mt-2 block h-0.5 w-16 bg-gold" />
          </p>
        </div>

        <div className="relative mx-auto flex max-w-7xl px-4 py-10 lg:min-h-[680px] lg:items-center lg:px-8 2xl:min-h-[760px]">
          <div className="w-full text-center lg:w-[38%] lg:text-right">
            <h1 className="text-4xl font-extrabold drop-shadow-[0_2px_8px_rgba(10,25,47,0.8)] lg:whitespace-nowrap lg:text-[2.6rem]">
              النقل السياحي <span className="text-gold">المتخصص</span>
            </h1>
            <div className="mt-4 flex items-center justify-center gap-4 lg:justify-start">
              <p className="text-xl font-semibold text-white/90">اكتشف الأردن … ونحن نهتم بالطريق</p>
              <span className="hidden h-0.5 w-16 shrink-0 bg-gold sm:block" />
            </div>
            <p className="mt-5 text-base leading-loose text-white/85 lg:text-lg">
              مع الأجنحة الذهبية، أصبحت رحلتك السياحية أكثر من مجرد وسيلة نقل، بل تجربة استثنائية
              مليئة بالراحة، التنظيم، والفخامة.
            </p>

            <div className="mt-8 grid grid-cols-3 divide-x divide-white/20">
              {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex flex-col items-center gap-2 px-2 text-center">
                  <Icon className="h-10 w-10 text-gold" strokeWidth={1.5} />
                  <p className="text-sm leading-snug text-white/90">
                    {title}
                    <br />
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <CtaButtons dark callLabel="اتصال" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 lg:px-8">
          {SECTIONS.map(({ number, icon: Icon, title, text, note, image, alt }) => (
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
                <div>
                  <h2 className="text-xl font-extrabold text-navy lg:text-2xl">{title}</h2>
                  <p className="mt-3 text-base leading-loose text-navy/80">{text}</p>
                  <p className="mt-2 text-base leading-loose text-navy/55">{note}</p>
                </div>
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
        </div>
      </section>
    </main>
  );
}
