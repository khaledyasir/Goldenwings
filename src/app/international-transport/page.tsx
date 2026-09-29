import type { Metadata } from "next";
import { Moon, Route, Mountain, Compass } from "lucide-react";
import PhotoHero from "@/components/PhotoHero";

export const metadata: Metadata = {
  title: "النقل الدولي للحافلات | الأجنحة الذهبية",
  description:
    "خدمات النقل الدولي بالحافلات بين الأردن والسعودية وسوريا ولبنان للحجاج والمعتمرين والسياح والمجموعات.",
};

const SERVICES = [
  {
    icon: Moon,
    title: "نقل الحجاج والمعتمرين إلى المملكة العربية السعودية",
    text: "نوفر خدمات نقل الحجاج والمعتمرين إلى السعودية لأداء مناسك الحج والعمرة، بالإضافة إلى خدمات التنقل بين المدن والمشاعر المقدسة، وفق برنامج الرحلة واحتياجات المجموعة.",
  },
  {
    icon: Route,
    title: "نقل المعتمرين من سوريا إلى السعودية",
    text: "نوفر خدمات نقل المعتمرين من سوريا إلى المملكة العربية السعودية، مع تنظيم رحلات المجموعات ونقل المعتمرين إلى وجهاتهم داخل المملكة، بما في ذلك التنقل خلال برنامج العمرة والمشاعر المقدسة.",
  },
  {
    icon: Mountain,
    title: "نقل المعتمرين من لبنان إلى السعودية",
    text: "نقدم خدمات نقل المعتمرين من لبنان إلى المملكة العربية السعودية، من خلال حافلات مناسبة للمجموعات، وخدمة نقل منظمة تراعي احتياجات الرحلة منذ الانطلاق وحتى الوصول.",
  },
  {
    icon: Compass,
    title: "النقل السياحي الدولي",
    text: "نقدم حلول النقل السياحي الدولي بالحافلات للمجموعات السياحية بين الأردن وسوريا ولبنان، من نقل السياح من الأردن إلى سوريا ولبنان، ومن سوريا ولبنان إلى الأردن.",
  },
];

export default function InternationalTransportPage() {
  return (
    <main>
      {/* Ultrawide (≈3:1) airport photo: copy sits over the road and skyline on the right, clear of the bus and terminal */}
      <PhotoHero
        image="/images/international-banner.png"
        alt="حافلة الأجنحة الذهبية قرب مطار الملكة علياء الدولي"
        objectPosition="object-[30%_center]"
        heightClass="lg:min-h-[560px] 2xl:min-h-[640px]"
        mobileAspect="2.4/1"
        title="النقل الدولي للحافلات"
        description="خدمات النقل الدولي بين الأردن والسعودية وسوريا ولبنان"
      />

      <section className="bg-white pt-16 lg:pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <p className="text-base leading-loose text-navy/80 lg:text-lg">
            تقدم الأجنحة الذهبية لتأجير الحافلات خدمات النقل الدولي بالحافلات للحجاج والمعتمرين
            والسياح والمجموعات، مع حلول نقل منظمة ومريحة تربط بين الأردن والمملكة العربية السعودية
            وسوريا ولبنان والضفة الغربية، مع الاهتمام براحة الركاب وتنظيم الرحلة من نقطة الانطلاق
            وحتى الوصول إلى الوجهة.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-16">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-2 lg:px-8">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-2xl border border-gold-light/40 bg-gold-light/10 p-7 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold shadow-md ring-4 ring-white">
                  <Icon className="h-6 w-6 text-navy" />
                </span>
                <h2 className="text-lg font-bold leading-snug text-navy">{title}</h2>
              </div>
              <p className="text-base leading-loose text-navy/80">{text}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl px-4 text-center text-lg font-bold text-gold-dark">
          نهدف إلى توفير تجربة سفر مريحة ومنظمة، مع حافلات مجهزة وسائقين محترفين لمرافقة المجموعات
          خلال رحلاتهم الدولية.
        </p>
      </section>
    </main>
  );
}
