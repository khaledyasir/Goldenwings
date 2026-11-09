import { contactLinks, editable, getGlobal, getSettings } from "@/lib/cms";
import { getLang } from "@/lib/getLang";

export default async function MapEmbed() {
  const [home, s, lang, ed] = await Promise.all([getGlobal("home"), getSettings(), getLang(), editable("home")]);
  const links = contactLinks(s);
  const label = home.mapTitle ?? "";
  return (
    <section id="map" className="scroll-mt-20 bg-white py-10">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <h2 className="mb-5 text-center text-xl font-bold text-navy lg:text-2xl">
          <a href={links.maps} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-dark" {...ed("mapTitle")}>
            {label}
          </a>
        </h2>
        <div className="overflow-hidden rounded-2xl border border-gold-light/40 shadow-md">
          <iframe
            title={label}
            src={links.mapsEmbed(lang)}
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
