import type { Metadata } from "next";
import { Quote } from "lucide-react";
import PageHero from "@/components/PageHero";
import CtaButtons from "@/components/CtaButtons";
import { REVIEWS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "آراء العملاء | الأجنحة الذهبية",
  description: "ثقة عملائنا وشركائنا هي أساس عملنا في الأجنحة الذهبية.",
};

const PLACEHOLDER_COUNT = 3;

export default function TestimonialsPage() {
  const hasReviews = REVIEWS.length > 0;

  return (
    <main>
      <PageHero
        title="آراء العملاء"
        description="ثقة عملائنا وشركائنا هي أساس عملنا، ونسعى دومًا لتقديم تجربة نقل تليق بتطلعاتهم."
      />

      <section className="bg-gradient-to-b from-white via-gold-light/10 to-white py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {hasReviews
            ? REVIEWS.map((review) => (
                <figure
                  key={`${review.name}-${review.company}`}
                  className="relative rounded-3xl bg-white p-8 pt-12 shadow-[0_18px_50px_-20px_rgba(10,25,47,0.35)] ring-1 ring-navy/10"
                >
                  <span className="absolute -top-6 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-gold shadow-lg ring-4 ring-white">
                    <Quote className="h-5 w-5 text-navy" />
                  </span>
                  <blockquote className="text-base leading-loose text-navy/80">
                    {review.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-navy/10 pt-4">
                    <p className="font-bold text-navy">{review.name}</p>
                    <p className="text-sm text-gold-dark">{review.company}</p>
                  </figcaption>
                </figure>
              ))
            : Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
                <figure
                  key={i}
                  className="relative rounded-3xl border-2 border-dashed border-gold-light bg-white/70 p-8 pt-12"
                >
                  <span className="absolute -top-6 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-gold-light shadow-md ring-4 ring-white">
                    <Quote className="h-5 w-5 text-navy" />
                  </span>
                  <blockquote className="space-y-3" aria-hidden="true">
                    <div className="h-3 w-full rounded-full bg-navy/10" />
                    <div className="h-3 w-11/12 rounded-full bg-navy/10" />
                    <div className="h-3 w-4/5 rounded-full bg-navy/10" />
                  </blockquote>
                  <figcaption className="mt-6 border-t border-navy/10 pt-4">
                    <p className="text-sm font-semibold text-navy/60">مكان رأي العميل</p>
                    <p className="text-xs text-navy/50">اسم العميل، اسم الشركة</p>
                  </figcaption>
                </figure>
              ))}
        </div>

        {!hasReviews && (
          <p className="mx-auto mt-10 max-w-xl px-4 text-center text-sm text-navy/60">
            سيتم عرض آراء عملائنا هنا قريبًا.
          </p>
        )}
      </section>

      <section className="bg-white pb-20 text-center">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <p className="text-base text-navy/80">
            هل تعاملت معنا من قبل؟ يسعدنا سماع رأيك للمساهمة في تطوير خدماتنا.
          </p>
          <div className="mt-6 flex justify-center">
            <CtaButtons />
          </div>
        </div>
      </section>
    </main>
  );
}
