import type { Metadata } from "next";
import { Quote } from "lucide-react";
import PageHero from "@/components/PageHero";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";
import { REVIEWS, type Review } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  return { title: t(await getLang(), "آراء العملاء", "Customer Reviews") };
}

// Same tile as the partners grid: the client shows up front, the review slides in on hover/focus (focus covers tapping on touch screens)
const TILE =
  "group relative flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-navy/10 outline-none transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gold/60 focus-visible:ring-2 focus-visible:ring-gold";

function ReviewTile({ quote, name, company }: Review) {
  return (
    <div tabIndex={0} className={TILE}>
      <div className="text-center transition duration-300 group-hover:scale-95 group-hover:opacity-20 group-focus-visible:opacity-20">
        <Quote className="mx-auto mb-2 h-6 w-6 text-gold" />
        <p className="text-lg font-extrabold text-navy/80">{name}</p>
        <p className="text-sm text-gold-dark">{company}</p>
      </div>
      <div className="absolute inset-0 flex translate-y-full items-center justify-center overflow-y-auto bg-navy/95 px-4 py-3 text-center text-sm leading-relaxed text-white transition duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
        {quote}
      </div>
    </div>
  );
}

/** Shown until real reviews are added: only the field names, no invented text */
const PLACEHOLDER = {
  ar: { name: "اسم العميل", company: "الشركة", quote: "نص التقييم" },
  en: { name: "Customer Name", company: "Company", quote: "Review text" },
};

export default async function TestimonialsPage() {
  const lang = await getLang();
  const reviews = REVIEWS.length ? REVIEWS : Array.from({ length: 8 }, () => PLACEHOLDER[lang]);
  return (
    <main>
      <PageHero title={t(lang, "آراء العملاء", "Customer Reviews")} />

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {reviews.map((review, i) => (
            <ReviewTile key={i} {...review} />
          ))}
        </div>
      </section>
    </main>
  );
}
