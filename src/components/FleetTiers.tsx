import Link from "next/link";
import {
  Armchair,
  ArrowLeft,
  BriefcaseMedical,
  Cctv,
  Fan,
  Lightbulb,
  PlugZap,
  Refrigerator,
  ShieldCheck,
  Snowflake,
  Toilet,
  Tv,
  Usb,
  Volume2,
  Wifi,
} from "lucide-react";
import { BOOKING_HREF, FLEET_GROUPS } from "@/lib/constants";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

// ponytail: one shared feature list for every bus tier, taken from the reference cards (VIP 30 / VIP 49), confirm per vehicle and add a per-tier override where one differs
const FEATURES = [
  { icon: Tv, text: { ar: "شاشات", en: "Screens" } },
  { icon: Wifi, text: { ar: "إنترنت", en: "Internet" } },
  { icon: Volume2, text: { ar: "نظام صوتي", en: "Sound system" } },
  { icon: Snowflake, text: { ar: "تبريد / تسخين", en: "Cooling / Heating" } },
  { icon: Fan, text: { ar: "نظام تهوية", en: "Ventilation system" } },
  { icon: Usb, text: { ar: "منفذ شاحن USB", en: "USB charging port" } },
  { icon: PlugZap, text: { ar: "قابس كهربائي 220V", en: "220V power outlet" } },
  { icon: Lightbulb, text: { ar: "إنارة", en: "Lighting" } },
  { icon: Refrigerator, text: { ar: "ثلاجة", en: "Refrigerator" } },
  { icon: Cctv, text: { ar: "كاميرات مراقبة", en: "CCTV cameras" } },
  { icon: ShieldCheck, text: { ar: "معدات الأمان والسلامة", en: "Safety and security equipment" } },
  { icon: BriefcaseMedical, text: { ar: "إسعافات أولية", en: "First aid" } },
  { icon: Toilet, text: { ar: "دورة مياه", en: "Restroom" } },
];

const CARS_GROUP = FLEET_GROUPS.length - 1;

                    </header>

                    {!isCar && (
                      <ul className="mb-6 mt-5 grid gap-x-8 sm:grid-cols-2">
                        {[{ icon: Armchair, text: t(lang, `${seats} ${seats > 10 ? "مقعد" : "مقاعد"}`, `${seats} seats`) }, ...FEATURES.map((f) => ({ icon: f.icon, text: f.text[lang] }))].map(({ icon: Icon, text }) => (
                          <li key={text} className="flex items-center gap-3 border-b border-gold/20 py-3 text-sm font-semibold text-navy">
                            <Icon className="h-6 w-6 shrink-0 text-gold-dark" strokeWidth={1.4} />
                            {text}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={`${BOOKING_HREF}?tier=${encodeURIComponent(name.ar)}`}
                      className="group mt-auto flex items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-bold text-gold transition hover:bg-navy-light"
                    >
                      {t(lang, "احجز الآن", "Book Now")}
                      <ArrowLeft className="h-4 w-4 transition ltr:rotate-180 group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
