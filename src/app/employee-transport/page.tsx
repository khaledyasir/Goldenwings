import type { Metadata } from "next";
import { Building2, Factory, Users, FileText, GraduationCap, Compass } from "lucide-react";
import PhotoHero from "@/components/PhotoHero";
import RoadPath from "@/components/RoadPath";

export const metadata: Metadata = {
  title: "نقل موظفين الشركات والمؤسسات والمصانع",
};

const FEATURES = [
  { icon: Building2, text: "خدمة نقل الموظفين للشركات والمؤسسات" },
  { icon: Factory, text: "حلول نقل متكاملة لموظفي المصانع" },
  { icon: Users, text: "خدمة نقل المشاركين والمنظمات والجمعيات" },
  {
    icon: FileText,
    text: "عقود نقل الموظفين (شهرية وسنوية) للشركات والمؤسسات حسب احتياجاتها",
  },
  { icon: GraduationCap, text: "نقل طلبة الجامعات والكليات" },
  { icon: Compass, text: "تقديم استشارات النقل داخل الأردن وخارجه" },
];

const NUM = "mx-1 text-3xl font-extrabold text-gold-dark lg:text-4xl";

export default function EmployeeTransportPage() {
  return (
    <main>
      {/* Wide photo (≈2.4:1) so the hero crops almost nothing; copy sits on the right over the open road and parking, clear of the people */}
      <PhotoHero
        image="/images/employee-hero.png"
        alt="موظفون يستقلون حافلة الأجنحة الذهبية أمام مبنى شركة"
        objectPosition="object-[62%_center]"
        heightClass="lg:min-h-[600px] 2xl:min-h-[700px]"
        mobileAspect="2.36/1"
        title="تأجير الحافلات الأردنية"
      />

      <section className="bg-white pt-16 lg:pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <p className="text-base leading-loose text-navy/80 lg:text-lg">
            الأجنحة الذهبية لتأجير الحافلات الأردنية متخصصة في نقل الموظفين وتأجير الحافلات
            الأردنية وتقدم خدمة نقل احترافية للشركات والمؤسسات والجامعات بحافلات حديثة ومريحة،
            وآمنة، وفريق سائقين محترفين، وتنظيم دقيق للمسارات والمواعيد وفق احتياجات كل جهة،
            لضمان تجربة نقل موثوقة، مريحة ومنظمة
          </p>
          <p className="mt-8 rounded-2xl border border-gold-light/60 bg-gold-light/10 px-6 py-6 text-xl font-bold leading-loose text-navy">
            على مدار<span className={NUM}>20</span>عام تنطلق كل صباح<span className={NUM}>57</span>
            رحلة تقل<span className={NUM}>1197</span>موظف الى مواقع عملهم بكل سهولة ويسر
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <div className="pointer-events-none absolute left-1/2 top-16 bottom-16 hidden w-40 -translate-x-1/2 lg:block">
          <RoadPath />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 lg:px-8">
          <div className="flex flex-col gap-10">
            {FEATURES.map(({ icon: Icon, text }, i) => {
              const alignEnd = i % 2 === 1;
              return (
                <div
                  key={text}
                  className={`flex items-center gap-5 lg:w-[55%] ${
                    alignEnd ? "lg:ml-auto lg:flex-row-reverse lg:text-left" : "lg:mr-auto"
                  }`}
                >
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold shadow-lg ring-4 ring-white">
                    <Icon className="h-7 w-7 text-navy" />
                  </span>
                  <p className="rounded-2xl border border-gold-light/50 bg-gold-light/10 p-5 text-base font-semibold text-navy shadow-sm">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
