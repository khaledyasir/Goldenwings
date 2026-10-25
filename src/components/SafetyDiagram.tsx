import {
  ClipboardCheck,
  DoorOpen,
  Radio,
  ShieldCheck,
  ShieldPlus,
  User,
  Wifi,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { getLang } from "@/lib/getLang";
import { type Bi } from "@/lib/i18n";

// ponytail: Arabic translation of the English labels on the client's reference diagram, confirm each point is true for the fleet
type Item = { icon: LucideIcon; text: Bi; sub?: Bi };

const ITEMS: Item[] = [
  { icon: ShieldCheck, text: { ar: "النوافذ تفتح حتى 5 سم فقط", en: "Windows open up to 5 cm only" } },
  { icon: DoorOpen, text: { ar: "باب أوتوماتيكي", en: "Automatic door" } },
  { icon: ShieldPlus, text: { ar: "معدات سلامة", en: "Safety equipment" }, sub: { ar: "مطرقة طوارئ وطفاية حريق وحقيبة إسعافات أولية", en: "Emergency hammer, fire extinguisher and first aid kit" } },
  { icon: Radio, text: { ar: "نظام مراقبة المركبة (IVMS)", en: "Vehicle monitoring system (IVMS)" } },
  { icon: User, text: { ar: "أحزمة الأمان", en: "Seat belts" } },
  { icon: ClipboardCheck, text: { ar: "تأمين شامل", en: "Comprehensive insurance" } },
  { icon: Wrench, text: { ar: "الصيانة الدورية", en: "Regular maintenance" } },
  { icon: Wifi, text: { ar: "خدمات الإنترنت (Wi-Fi)", en: "Internet services (Wi-Fi)" } },
];

export default async function SafetyDiagram() {
  const lang = await getLang();
  return (
    <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 md:grid-cols-4 lg:px-8">
      {ITEMS.map(({ icon: Icon, text, sub }) => (
        <li key={text.en} className="flex flex-col items-center gap-4 text-center">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy text-gold shadow-lg ring-4 ring-gold/30">
            <Icon className="h-9 w-9" strokeWidth={1.6} />
          </span>
          <span className="text-base font-bold leading-snug text-navy">{text[lang]}</span>
          {sub && <span className="-mt-2 text-sm leading-snug text-navy/70">{sub[lang]}</span>}
        </li>
      ))}
    </ul>
  );
}
