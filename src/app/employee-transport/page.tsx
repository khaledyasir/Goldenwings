import type { Metadata } from "next";
import { Building2, Factory, Users, FileText, GraduationCap, Compass } from "lucide-react";
import PhotoHero from "@/components/PhotoHero";

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
        bookLabel="طلب عرض سعر"
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

      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {FEATURES.map(({ icon: Icon, text }, i) => (
            <article
              key={text}
              className="group relative overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-navy/10 transition hover:-translate-y-1 hover:shadow-xl hover:ring-gold/60"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-transparent via-gold to-transparent" />
              <span className="absolute -bottom-4 left-3 select-none text-8xl font-extrabold text-gold/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-navy shadow-md ring-4 ring-gold/30 transition group-hover:bg-gold">
                <Icon className="h-7 w-7 text-gold transition group-hover:text-navy" />
              </span>
              <p className="relative mt-5 text-base font-bold leading-loose text-navy">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
