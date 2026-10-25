import type { Metadata } from "next";
import { Building2, Factory, Users, FileText, GraduationCap, Compass } from "lucide-react";
import PhotoHero from "@/components/PhotoHero";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: t(
      await getLang(),
      "نقل موظفين الشركات والمؤسسات والمصانع",
      "Industrial Establishments, Corporations & Companies' Employee Transportation",
    ),
  };
}

const FEATURES = [
  { icon: Building2, text: { ar: "خدمة نقل الموظفين للشركات والمؤسسات", en: "Companies and corporations' employee transportation." } },
  { icon: Factory, text: { ar: "حلول نقل متكاملة لموظفي المصانع", en: "Comprehensive transportation solutions for factory employees." } },
  { icon: Users, text: { ar: "خدمة نقل المشاركين والمنظمات والجمعيات", en: "Transportation services for participants, organizations and associations." } },
  {
    icon: FileText,
    text: {
      ar: "عقود نقل الموظفين (شهرية وسنوية) للشركات والمؤسسات حسب احتياجاتها",
      en: "Monthly and annual employee transportation contracts tailored to the companies and corporations' needs.",
    },
  },
  { icon: GraduationCap, text: { ar: "نقل طلبة الجامعات والكليات", en: "University and college student transportation." } },
  { icon: Compass, text: { ar: "تقديم استشارات النقل داخل الأردن وخارجه", en: "Transportation consultation services within and without Jordan." } },
];

const NUM = "mx-1 text-3xl font-extrabold text-gold-dark lg:text-4xl";

export default async function EmployeeTransportPage() {
  const lang = await getLang();
  return (
    <main>
      {/* Wide photo (≈2.4:1) so the hero crops almost nothing; copy sits on the right over the open road and parking, clear of the people */}
      <PhotoHero
        image="/images/employee-hero.png"
        alt={t(lang, "موظفون يستقلون حافلة الأجنحة الذهبية أمام مبنى شركة", "Employees boarding a Golden Wings bus in front of a company building")}
        objectPosition="object-[62%_center]"
        heightClass="lg:min-h-[600px] 2xl:min-h-[700px]"
        mobileAspect="2.36/1"
        title={t(lang, "تأجير الحافلات الأردنية", "Jordanian Bus Rental")}
        bookLabel={t(lang, "طلب عرض سعر", "Request a Quote")}
      />

      <section className="bg-white pt-16 lg:pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <p className="text-base leading-loose text-navy/80 lg:text-lg">
            {t(
              lang,
              "الأجنحة الذهبية لتأجير الحافلات الأردنية متخصصة في نقل الموظفين وتأجير الحافلات الأردنية وتقدم خدمة نقل احترافية للشركات والمؤسسات والجامعات بحافلات حديثة ومريحة، وآمنة، وفريق سائقين محترفين، وتنظيم دقيق للمسارات والمواعيد وفق احتياجات كل جهة، لضمان تجربة نقل موثوقة، مريحة ومنظمة",
              "Golden Wings Jordanian Bus Rental specializes in employee transportation and Jordanian bus rental services, providing professional transportation solutions for companies, corporations and universities, using modern, comfortable and safe buses supported by a team of professional drivers. Our routes and schedules are carefully organized to meet each organization's needs and ensure a reliable, comfortable and well-organized transportation experience.",
            )}
          </p>
          <p className="mt-8 rounded-2xl border border-gold-light/60 bg-gold-light/10 px-6 py-6 text-xl font-bold leading-loose text-navy">
            {lang === "ar" ? (
              <>
                على مدار<span className={NUM}>20</span>عام تنطلق كل صباح<span className={NUM}>57</span>
                رحلة تقل<span className={NUM}>1197</span>موظف الى مواقع عملهم بكل سهولة ويسر
              </>
            ) : (
              <>
                For over<span className={NUM}>20</span>years, we have operated<span className={NUM}>57</span>
                daily morning trips, transporting<span className={NUM}>1197</span>employees to their workplaces smoothly and efficiently.
              </>
            )}
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {FEATURES.map(({ icon: Icon, text }, i) => (
            <article
              key={text.en}
              className="group relative overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-navy/10 transition hover:-translate-y-1 hover:shadow-xl hover:ring-gold/60"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-transparent via-gold to-transparent" />
              <span className="absolute -bottom-4 left-3 select-none text-8xl font-extrabold text-gold/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-navy shadow-md ring-4 ring-gold/30 transition group-hover:bg-gold">
                <Icon className="h-7 w-7 text-gold transition group-hover:text-navy" />
              </span>
              <p className="relative mt-5 text-base font-bold leading-loose text-navy">{text[lang]}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
