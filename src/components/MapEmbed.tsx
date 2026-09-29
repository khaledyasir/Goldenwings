import { MapPin } from "lucide-react";
import { MAPS_EMBED, MAPS_LINK } from "@/lib/constants";

export default function MapEmbed() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-navy lg:text-3xl">
          موقعنا
        </h2>
        <div className="overflow-hidden rounded-2xl border border-gold-light/40 shadow-md">
          <iframe
            title="موقع الأجنحة الذهبية على خرائط جوجل"
            src={MAPS_EMBED}
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-6 flex justify-center">
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy shadow-md transition hover:bg-gold-light"
          >
            <MapPin className="h-4 w-4" />
            افتح الموقع على خرائط جوجل
          </a>
        </div>
      </div>
    </section>
  );
}
