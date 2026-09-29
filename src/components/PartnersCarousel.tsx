import Image from "next/image";
import Link from "next/link";
import { PARTNERS } from "@/lib/constants";

const TILE =
  "flex h-24 w-52 shrink-0 items-center justify-center px-4 transition hover:scale-105";

/** Home-page marquee; the full grid with hover captions lives on the partners page (PartnersGrid) */
export default function PartnersCarousel() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-5 px-4 lg:px-8">
        <span className="h-0.5 w-20 rounded-full bg-gold" />
        <h2 className="text-2xl font-bold text-navy lg:text-3xl">الشركاء</h2>
        <span className="h-0.5 w-20 rounded-full bg-gold" />
      </div>

      <div className="mt-8 group overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-partners-scroll gap-8 group-hover:[animation-play-state:paused]">
          {[...PARTNERS, ...PARTNERS].map(({ name, src }, i) => (
            <Link key={`${name}-${i}`} href="/partners" className={TILE}>
              <Image
                src={src}
                alt={name}
                width={200}
                height={100}
                className="max-h-20 w-auto object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
