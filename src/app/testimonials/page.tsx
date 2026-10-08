import type { Metadata } from "next";
import { Quote } from "lucide-react";
import PageHero from "@/components/PageHero";
import { REVIEWS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "آراء العملاء",
};

export default function TestimonialsPage() {
  return (
    <main>
      <PageHero title="آراء العملاء" />

      {REVIEWS.length > 0 && (
        <section className="bg-gradient-to-b from-white via-gold-light/10 to-white py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {REVIEWS.map((review) => (
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
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
