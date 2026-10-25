import type { Metadata } from "next";
import { Plane, Landmark, MapPin } from "lucide-react";
import PhotoHero from "@/components/PhotoHero";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

const TITLE = {
  ar: "النقل السياحي من وإلى المطار والمعابر الحدودية",
  en: "Tourist Transportation to and from Airports and Border Crossings",
};

export async function generateMetadata(): Promise<Metadata> {
  return { title: TITLE[await getLang()] };
}

const DESTINATIONS = [
  { ar: "مطار الملكة علياء الدولي", en: "Queen Alia International Airport." },
  { ar: "فنادق عمّان", en: "Hotels in Amman." },
  {
    ar: "المواقع السياحية (البتراء، وادي رم، العقبة، أم قيس، جرش، عجلون، القصور الصحراوية، ضانا وأي وجهة سياحية)",
    en: "Tourist attractions (Petra, Wadi Rum, Aqaba, Umm Qais, Jerash, Ajloun, the Desert Castles, Dana... any other tourist destinations).",
  },
];

const CARD = "rounded-2xl border border-gold-light/40 bg-gold-light/10 p-7 shadow-sm";
const BADGE =
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold shadow-md ring-4 ring-white";

export default async function AirportTransportPage() {
  const lang = await getLang();
  return (
    <main>
      <PhotoHero
        image="/images/international-banner.png"
        alt={t(lang, "حافلة الأجنحة الذهبية قرب مطار الملكة علياء الدولي", "A Golden Wings bus near Queen Alia International Airport")}
        objectPosition="object-[30%_center]"
        heightClass="lg:min-h-[560px] 2xl:min-h-[640px]"
        mobileAspect="2.4/1"
        title={TITLE[lang]}
        description={lang === "en" ? "Book Your Airport or Border Crossing Transportation Today." : undefined}
      />

      <section className="bg-white pt-14 lg:pt-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center lg:px-8">
          <p className="text-base leading-loose text-navy/80 lg:text-lg">
            {t(
              lang,
              "تنقل مريح وآمن مع الأجنحة الذهبية للنقل السياحي. خدمات نقل سياحي احترافية للسياح والقادمين والمغادرين من وإلى مطار الملكة علياء الدولي والمعابر الحدودية، أو الفنادق في مختلف الوجهات السياحية.",
              "Enjoy comfortable and safe transportation with Golden Wings Tourism Transportation. We provide professional tourist transportation services to both arriving and departing travelers to and from Queen Alia International Airport and border crossings or hotels in various tourist destinations.",
            )}
          </p>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-16">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 lg:px-8">
          <article className={CARD}>
            <div className="flex items-center gap-4">
              <span className={BADGE}>
                <Plane className="h-6 w-6 text-navy" />
              </span>
              <h2 className="text-xl font-bold text-navy">
                {t(lang, "نقل السياح من وإلى مطار الملكة علياء الدولي", "Tourist Transportation to and from Queen Alia International Airport")}
              </h2>
            </div>
            <p className="mt-4 text-base leading-loose text-navy/80">
              {t(
                lang,
                "مع اختيارك للأجنحة الذهبية للنقل السياحي، سيكون فريقنا بانتظارك عند الوصول لاستقبالك ومساعدتك في نقل أمتعتك واصطحابك إلى وجهتك بكل راحة، سواء كنت متجهاً إلى أحد فنادق عمّان أو إلى أي مدينة أو موقع سياحي في الأردن، نحرص على توفير تجربة نقل فاخرة، تضمن وصولك في الوقت المحدد.",
                "When you choose Golden Wings, our team will be waiting for you upon arrival to welcome you, assist with your luggage and accompany you comfortably to your destination. Whether you are traveling to a hotel in Amman, or to another city or tourist destination anywhere in Jordan, we are committed to providing you with a premium transportation experience that ensures you arrive on time.",
              )}
            </p>
          </article>

          <article className={CARD}>
            <div className="flex items-center gap-4">
              <span className={BADGE}>
                <Landmark className="h-6 w-6 text-navy" />
              </span>
              <h2 className="text-xl font-bold text-navy">
                {t(lang, "النقل من وإلى معبر الشيخ حسين", "Transportation to and from Sheikh Hussein Border Crossing")}
              </h2>
            </div>
            <p className="mt-4 text-base leading-loose text-navy/80">
              {t(
                lang,
                "نوفر خدمة النقل السياحي من وإلى معبر الشيخ حسين لمختلف أعداد المسافرين، أياً كانت وجهتك داخل الأردن.",
                "We provide tourist transportation to and from Sheikh Hussein Border Crossing to groups and individual travelers regardless of their destination within Jordan.",
              )}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {DESTINATIONS.map((d) => (
                <li key={d.en} className="flex items-start gap-2 text-base leading-relaxed text-navy/80">
                  <MapPin className="mt-1.5 h-4 w-4 shrink-0 text-gold-dark" />
                  {d[lang]}
                </li>
              ))}
            </ul>
          </article>

          <article className={CARD}>
            <div className="flex items-center gap-4">
              <span className={BADGE}>
                <Landmark className="h-6 w-6 text-navy" />
              </span>
              <h2 className="text-xl font-bold text-navy">
                {t(lang, "النقل من وإلى جسر الملك حسين", "Transportation to and from King Hussein Bridge")}
              </h2>
            </div>
            <p className="mt-4 text-base leading-loose text-navy/80">
              {t(
                lang,
                "خدمات النقل من وإلى جسر الملك حسين للمجموعات والأفراد، إلى مختلف الوجهات سواء كانت وجهتك مطار الملكة علياء الدولي أو أحد فنادق عمّان أو أي موقع سياحي في الأردن.",
                "We provide transportation services to and from King Hussein Bridge to groups and individuals traveling to various destinations. Whether your destination is Queen Alia International Airport, a hotel in Amman, or any tourist attraction in Jordan, we offer reliable and comfortable transportation tailored to your journey.",
              )}
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
