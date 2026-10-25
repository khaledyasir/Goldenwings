import { MAPS_LINK, mapsEmbed } from "@/lib/constants";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

export default async function MapEmbed() {
  const lang = await getLang();
  const label = t(lang, "خريطة الموقع", "Location Map");
  return (
    <section id="map" className="scroll-mt-20 bg-white py-10">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <h2 className="mb-5 text-center text-xl font-bold text-navy lg:text-2xl">
          <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-dark">
            {label}
          </a>
        </h2>
        <div className="overflow-hidden rounded-2xl border border-gold-light/40 shadow-md">
          <iframe
            title={label}
            src={mapsEmbed(lang)}
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
