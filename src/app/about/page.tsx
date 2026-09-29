import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ValuePropsStrip from "@/components/ValuePropsStrip";

export const metadata: Metadata = {
  title: "من نحن | الأجنحة الذهبية",
  description: "شركة متخصصة في نقل الموظفين وتأجير الحافلات الأردنية.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero title="من نحن" />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:px-8">
          <div className="order-2 text-center lg:order-1 lg:text-right">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">
              الأجنحة الذهبية
            </span>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-navy lg:text-4xl">
              فريق محترف وأسطول حديث
            </h2>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gold lg:mx-0" />
            <p className="mt-6 text-base leading-loose text-navy/75 lg:text-lg">
              الأجنحة الذهبية شركة متخصصة في نقل الموظفين وتأجير الحافلات الأردنية، تقدم حلول
              نقل احترافية للشركات والمؤسسات والجامعات بحافلات حديثة ومريحة وآمنة، وفريق سائقين
              محترفين، وتنظيم دقيق للمسارات والمواعيد وفق احتياجات كل جهة، لضمان تجربة نقل
              موثوقة، مريحة ومنظمة.
            </p>
            <p className="mt-8 border-r-4 border-gold pr-4 text-lg font-bold text-gold-dark lg:pr-5">
              الأجنحة الذهبية… شريككم الموثوق في النقل.
            </p>
          </div>

          {/* Photo carries the section: large, clean, with an offset gold frame for depth */}
          <div className="relative order-1 lg:order-2">
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -left-5 hidden h-full w-full rounded-3xl border-2 border-gold/50 lg:block"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_70px_-25px_rgba(10,25,47,0.55)] ring-1 ring-navy/10">
              <Image
                src="/images/team.png"
                alt="فريق سائقي الأجنحة الذهبية أمام أسطول الحافلات"
                fill
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ValuePropsStrip />
    </main>
  );
}
