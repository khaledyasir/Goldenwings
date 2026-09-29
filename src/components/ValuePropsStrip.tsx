import { ShieldCheck, Clock, UserCheck, Headset } from "lucide-react";
import { VALUE_PROPS } from "@/lib/constants";

const ICONS = [ShieldCheck, Clock, UserCheck, Headset];

export default function ValuePropsStrip() {
  return (
    <section className="bg-white pb-10 pt-4">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Navy panel with a gold rule on top, inset from the edges so it reads as a card, not a full-bleed bar */}
        <div className="relative overflow-hidden rounded-2xl bg-navy text-white shadow-xl ring-1 ring-navy/10">
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-transparent via-gold to-transparent" />
          <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
            {VALUE_PROPS.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-3 bg-navy px-4 py-7 text-center transition hover:bg-navy-light lg:flex-row lg:gap-4 lg:px-6 lg:text-start"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-gold/10">
                    <Icon className="h-7 w-7 text-gold" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold lg:text-base">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/75 lg:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
