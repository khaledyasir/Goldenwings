import type { Metadata } from "next";
import Image from "next/image";
import { Check, Mountain, Plane } from "lucide-react";
import CtaButtons from "@/components/CtaButtons";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: t(
      await getLang(),
      "نقل السياح. النقل السياحي المتخصص. نقل سياحي في الأردن",
      "Specialized Tourism Transportation for Tourists and Groups",
    ),
  };
}

const WHY = [
  { ar: "خدمة استقبال وتوصيل من وإلى المطار والمعابر الحدودية", en: "Airport and border-crossing pickup and drop-off services." },
  { ar: "مركبات حديثة ومجهزة بأعلى المعايير", en: "Modern vehicles equipped to the highest standards." },
  { ar: "فريق محترف وسائقون لديهم خبرة واسعة بالوجهات السياحية", en: "Professional team and experienced drivers familiar with tourist destinations." },
  { ar: "سهولة الحجز", en: "Easy booking process." },
  { ar: "الالتزام بالمواعيد", en: "Punctual and reliable service." },
  { ar: "رحلات نقل مخصصة حسب الوجهة وعدد المسافرين", en: "Customized transportation trips based on destinations and number of passengers." },
];

const SECTIONS = [
  {
    number: "01",
    icon: Mountain,
    text: {
      ar: "السياحة الداخلية والرحلات الاستكشافية الى جميع الوجهات السياحية، والأودية، خدمات نقل سياحي متخصص لعشاق الاستكشاف وسياحة المغامرات والتخييم.",
      en: "Domestic Tourism and Exploration Trips – Explore Jordan and all its tourist destinations and valleys. We provide specialized tourist transportation for exploration enthusiasts, adventure and camping groups.",
    },
    image: "/images/service-tourism.png",
    alt: { ar: "حافلة الأجنحة الذهبية على طريق وادي رم", en: "A Golden Wings bus on a Wadi Rum road" },
  },
  {
    number: "02",
    icon: Plane,
    text: {
      ar: "استقبال السياح والمجموعات السياحية من مطار الملكة علياء ونقلهم إلى الفنادق بما يضمن بداية مريحة ومنظمة لزيارتهم في الأردن، باختيارك الأجنحة الذهبية سيكون فريقنا باستقبالك واصطحابك الى وجهتك وتسهيل وصولك لتجربة مليئة بالفخامة.",
      en: "Airport Pickup and Hotel Transfers – We welcome tourists and tour groups arriving at Queen Alia International Airport and transportation them to their hotels, ensuring a comfortable and well-organized start to their visit to Jordan. When you choose Golden Wings, our team will welcome you, accompany you to your destination and make your arrival seamless, creating a luxurious travel experience.",
    },
    image: "/images/international-banner.png",
    alt: { ar: "حافلة الأجنحة الذهبية قرب مطار الملكة علياء الدولي", en: "A Golden Wings bus near Queen Alia International Airport" },
  },
];

export default async function TourismTransportPage() {
  const lang = await getLang();
  return (
    <main>
      {/* Full-bleed photo hero like the employee page: copy sits over the open valley on the right,
          keeping the Monastery, bus and tourists clear. On lg the photo is shifted left and solid navy fills the
          freed strip under the copy; below lg the photo stacks above the copy. */}
      <section className="relative isolate overflow-hidden bg-navy pb-10 text-white lg:pb-12">
        <div className={`relative aspect-[16/10] w-full lg:absolute lg:inset-y-0 lg:aspect-auto ${lang === "en" ? "lg:-right-[14%] lg:left-[14%]" : "lg:-left-[14%] lg:right-[14%]"}`}>
          <Image
            src="/images/tourism-hero.png"
            alt={t(lang, "حافلة الأجنحة الذهبية مع مجموعة سياحية عند البتراء", "A Golden Wings bus with a tour group at Petra")}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[38%_55%]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-navy from-2% via-navy/65 via-35% to-transparent to-60% max-lg:hidden ltr:bg-gradient-to-r" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/60 to-transparent" />
        </div>

        <div className="relative mx-auto flex max-w-7xl px-4 py-10 lg:min-h-[640px] lg:items-center lg:px-8 2xl:min-h-[720px]">
          <div className="w-full text-center lg:w-[42%] lg:text-start">
            <h1 className="text-4xl font-extrabold drop-shadow-[0_2px_8px_rgba(10,25,47,0.8)] lg:text-[2.6rem]">
              {lang === "ar" ? (
                <>
                  النقل السياحي <span className="text-gold">المتخصص</span>
                </>
              ) : (
                <>
                  <span className="text-gold">Specialized</span> Tourism Transportation
                </>
              )}
            </h1>
            <div className="mt-4 flex items-center justify-center gap-4 lg:justify-start">
              <p className="text-xl font-semibold text-white/90">
                {t(lang, "نقل السياح والمجموعات السياحي", "for Tourists and Groups")}
              </p>
              <span className="hidden h-0.5 w-16 shrink-0 bg-gold sm:block" />
            </div>
            <p className="mt-5 text-base leading-loose text-white/85 lg:text-lg">
              {t(
                lang,
                "خدمة نقل سياحي متكاملة للسياح، والمجموعات السياحية، والزوار القادمين من خارج الأردن، من خلال فريق محترف وخبرة تمتد لأكثر من 20 عام في مجال النقل السياحي المتخصص انطلق معنا إلى أفضل الوجهات السياحية في الأردن.",
                "Comprehensive tourist transportation services for individual travelers, tour groups and visitors arriving from abroad. With a professional team and more than 20 years of experience in specialized tourism transportation, we take you to Jordan's finest destinations.",
              )}
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <CtaButtons dark />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 lg:px-8">
          {SECTIONS.map(({ number, icon: Icon, text, image, alt }) => (
            <article
              key={number}
              className="flex flex-col overflow-hidden rounded-xl bg-gradient-to-l from-white to-gray-50 shadow-sm ltr:bg-gradient-to-r ring-1 ring-navy/5 lg:flex-row"
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
                <p className="self-center text-base leading-loose text-navy/80 lg:text-lg">{text[lang]}</p>
              </div>

              {/* Photo with a slanted gold edge facing the text */}
              <div className="relative h-56 shrink-0 lg:h-auto lg:w-[38%]">
                <div className="absolute inset-0 bg-gold lg:[clip-path:polygon(0_0,100%_0,88%_100%,0_100%)] ltr:lg:[clip-path:polygon(0_0,100%_0,100%_100%,12%_100%)]" />
                <div className="absolute inset-0 lg:[clip-path:polygon(0_0,97.5%_0,85.5%_100%,0_100%)] ltr:lg:[clip-path:polygon(2.5%_0,100%_0,100%_100%,14.5%_100%)]">
                  <Image
                    src={image}
                    alt={alt[lang]}
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </article>
          ))}

          <p className="mt-6 text-center text-xl font-extrabold text-gold-dark lg:text-2xl">
            {t(lang, "سيقدم لكم فريقنا المحترف تجربة نقل لرحلة استثنائية", "Our professional team will provide you with an exceptional transportation experience.")}
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border-2 border-gold bg-white p-5 shadow-lg lg:p-7">
          <h2 className="mb-5 text-center text-xl font-extrabold text-navy lg:text-2xl">
            {t(lang, "لماذا تختار الأجنحة الذهبية للنقل السياحي؟", "Why Choose Golden Wings for Tourism Transportation?")}
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {WHY.map((w) => (
              <li
                key={w.en}
                className="flex items-start gap-3 rounded-xl bg-gold-light/10 p-3.5 ring-1 ring-gold-light/50"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold">
                  <Check className="h-3.5 w-3.5 text-navy" />
                </span>
                <span className="text-sm font-bold leading-relaxed text-navy">{w[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
