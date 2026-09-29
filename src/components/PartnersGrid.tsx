import Image from "next/image";
import { PARTNERS } from "@/lib/constants";

const TILE =
  "group relative flex h-32 items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-navy/10 outline-none transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gold/60 focus-visible:ring-2 focus-visible:ring-gold";

function PartnerTile({ name, src, caption }: { name: string; src: string; caption?: string }) {
  return (
    <div tabIndex={0} className={TILE}>
      <Image
        src={src}
        alt={name}
        width={200}
        height={100}
        className="max-h-20 w-auto object-contain transition duration-300 group-hover:scale-95 group-hover:opacity-20 group-focus-visible:opacity-20"
      />
      {/* Caption slides in on hover/focus (focus covers tapping on touch screens) */}
      <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-center gap-1 bg-navy/95 px-3 text-center text-white transition duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
        <span className="text-sm font-bold text-gold">{name}</span>
        <span className="text-xs leading-relaxed text-white/80">
          {caption ?? "نبذة عن الشركة ستضاف قريبًا"}
        </span>
      </div>
    </div>
  );
}

export default function PartnersGrid() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-5 px-4 lg:px-8">
        <span className="h-0.5 w-20 rounded-full bg-gold" />
        <h2 className="text-2xl font-bold text-navy lg:text-3xl">الشركاء</h2>
        <span className="h-0.5 w-20 rounded-full bg-gold" />
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 lg:grid-cols-5 lg:px-8">
        {PARTNERS.map((partner) => (
          <PartnerTile key={partner.name} {...partner} />
        ))}
      </div>
    </section>
  );
}
