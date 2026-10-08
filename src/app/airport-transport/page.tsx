import type { Metadata } from "next";
import Link from "next/link";
import { Plane, Landmark, MapPin } from "lucide-react";
import PhotoHero from "@/components/PhotoHero";
import { BOOKING_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "النقل السياحي من وإلى المطار والمعابر الحدودية",
};

const DESTINATIONS = [
  "مطار الملكة علياء الدولي",
  "فنادق عمّان",
  "المواقع السياحية (البتراء، وادي رم، العقبة، أم قيس، جرش، عجلون، القصور الصحراوية، ضانا وأي وجهة سياحية)",
];

const CARD = "rounded-2xl border border-gold-light/40 bg-gold-light/10 p-7 shadow-sm";
const BADGE =
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold shadow-md ring-4 ring-white";

export default function AirportTransportPage() {
  return (
    <main>
      <PhotoHero
        image="/images/international-banner.png"
        alt="حافلة الأجنحة الذهبية قرب مطار الملكة علياء الدولي"
        objectPosition="object-[30%_center]"
        heightClass="lg:min-h-[560px] 2xl:min-h-[640px]"
        mobileAspect="2.4/1"
        title="النقل السياحي من وإلى المطار والمعابر الحدودية"
        hideCta
      />

      <section className="bg-white pt-14 lg:pt-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center lg:px-8">
          <p className="text-lg font-bold text-navy">
            حجز خدمة النقل السياحي من المطار أو المعابر الحدودية
          </p>
          <Link
            href={BOOKING_HREF}
            className="rounded-md bg-gold px-10 py-3.5 text-base font-bold text-navy shadow-md transition hover:bg-gold-light"
          >
            احجز الآن
          </Link>
          <p className="mt-4 text-base leading-loose text-navy/80 lg:text-lg">
            تنقل مريح وآمن مع الأجنحة الذهبية للنقل السياحي. خدمات نقل سياحي احترافية للسياح
            والقادمين والمغادرين من وإلى مطار الملكة علياء الدولي والمعابر الحدودية، أو الفنادق
            في مختلف الوجهات السياحية.
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
                نقل السياح من وإلى مطار الملكة علياء الدولي
              </h2>
            </div>
            <p className="mt-4 text-base leading-loose text-navy/80">
              مع اختيارك للأجنحة الذهبية للنقل السياحي، سيكون فريقنا بانتظارك عند الوصول لاستقبالك
              ومساعدتك في نقل أمتعتك واصطحابك إلى وجهتك بكل راحة، سواء كنت متجهاً إلى أحد فنادق
              عمّان أو إلى أي مدينة أو موقع سياحي في الأردن، نحرص على توفير تجربة نقل فاخرة، تضمن
              وصولك في الوقت المحدد.
            </p>
          </article>

          <article className={CARD}>
            <div className="flex items-center gap-4">
              <span className={BADGE}>
                <Landmark className="h-6 w-6 text-navy" />
              </span>
              <h2 className="text-xl font-bold text-navy">النقل من وإلى معبر الشيخ حسين</h2>
            </div>
            <p className="mt-4 text-base leading-loose text-navy/80">
              نوفر خدمة النقل السياحي من وإلى معبر الشيخ حسين لمختلف أعداد المسافرين، أياً كانت
              وجهتك داخل الأردن.
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {DESTINATIONS.map((d) => (
                <li key={d} className="flex items-start gap-2 text-base leading-relaxed text-navy/80">
                  <MapPin className="mt-1.5 h-4 w-4 shrink-0 text-gold-dark" />
                  {d}
                </li>
              ))}
            </ul>
          </article>

          <article className={CARD}>
            <div className="flex items-center gap-4">
              <span className={BADGE}>
                <Landmark className="h-6 w-6 text-navy" />
              </span>
              <h2 className="text-xl font-bold text-navy">النقل من وإلى جسر الملك حسين</h2>
            </div>
            <p className="mt-4 text-base leading-loose text-navy/80">
              خدمات النقل من وإلى جسر الملك حسين للمجموعات والأفراد، إلى مختلف الوجهات سواء كانت
              وجهتك مطار الملكة علياء الدولي أو أحد فنادق عمّان أو أي موقع سياحي في الأردن.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
