import { MAPS_EMBED, MAPS_LINK } from "@/lib/constants";

export default function MapEmbed() {
  return (
    <section id="map" className="scroll-mt-20 bg-white py-10">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <h2 className="mb-5 text-center text-xl font-bold text-navy lg:text-2xl">
          <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-dark">
            خريطة الموقع
          </a>
        </h2>
        <div className="overflow-hidden rounded-2xl border border-gold-light/40 shadow-md">
          <iframe
            title="خريطة الموقع"
            src={MAPS_EMBED}
            width="100%"
            height="260"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
