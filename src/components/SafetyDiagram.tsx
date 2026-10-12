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

// ponytail: Arabic translation of the English labels on the client's reference diagram, confirm each point is true for the fleet
type Item = { icon: LucideIcon; text: string; sub?: string };

const ITEMS: Item[] = [
  { icon: ShieldCheck, text: "النوافذ تفتح حتى 5 سم فقط" },
  { icon: DoorOpen, text: "باب أوتوماتيكي" },
  { icon: ShieldPlus, text: "معدات سلامة", sub: "مطرقة طوارئ وطفاية حريق وحقيبة إسعافات أولية" },
  { icon: Radio, text: "نظام مراقبة المركبة (IVMS)" },
  { icon: User, text: "أحزمة الأمان" },
  { icon: ClipboardCheck, text: "تأمين شامل" },
  { icon: Wrench, text: "الصيانة الدورية" },
  { icon: Wifi, text: "خدمات الإنترنت (Wi-Fi)" },
];

export default function SafetyDiagram() {
  return (
    <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 md:grid-cols-4 lg:px-8">
      {ITEMS.map(({ icon: Icon, text, sub }) => (
        <li key={text} className="flex flex-col items-center gap-4 text-center">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy text-gold shadow-lg ring-4 ring-gold/30">
            <Icon className="h-9 w-9" strokeWidth={1.6} />
          </span>
          <span className="text-base font-bold leading-snug text-navy">{text}</span>
          {sub && <span className="-mt-2 text-sm leading-snug text-navy/70">{sub}</span>}
        </li>
      ))}
    </ul>
  );
}
