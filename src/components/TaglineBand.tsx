import { Route } from "lucide-react";

/** Company tagline, rendered once in the root layout so every page ends the same way, just above the footer */
export default function TaglineBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-l from-gold via-gold-light to-gold py-6 text-navy lg:py-7">
      {/* Faint road dashes along the bottom edge, echoing the road motif used elsewhere on the site */}
      <span className="absolute inset-x-0 bottom-2 h-px bg-[repeating-linear-gradient(to_left,rgba(10,25,47,0.25)_0_14px,transparent_14px_28px)]" />
      <div className="relative mx-auto flex max-w-4xl items-center justify-center gap-4 px-4 lg:gap-6">
        <span className="h-px w-8 bg-navy/40 lg:w-20" />
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-gold shadow-md">
          <Route className="h-5 w-5" />
        </span>
        <p className="text-center text-lg font-extrabold leading-snug lg:text-2xl">
          حلول نقل متكاملة تلبي تطلعاتكم
        </p>
        <span className="h-px w-8 bg-navy/40 lg:w-20" />
      </div>
    </section>
  );
}
