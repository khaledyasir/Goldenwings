import {
  Baby,
  DoorOpen,
  FireExtinguisher,
  Hammer,
  Radio,
  ShieldCheck,
  User,
  type LucideIcon,
} from "lucide-react";

// ponytail: Arabic translation of the English labels on the client's reference diagram, confirm each point is true for the fleet
type Item = { icon: LucideIcon; text: string };

const LEFT: Item[] = [
  { icon: ShieldCheck, text: "النوافذ تفتح حتى 5 سم فقط" },
  { icon: DoorOpen, text: "باب أوتوماتيكي" },
  { icon: Hammer, text: "مطرقة الطوارئ" },
  { icon: FireExtinguisher, text: "طفاية حريق وحقيبة إسعافات أولية" },
];
const RIGHT: Item[] = [
  { icon: Radio, text: "نظام مراقبة المركبة (IVMS)" },
  { icon: User, text: "أحزمة الأمان" },
  { icon: Baby, text: "نظام فحص الأطفال" },
];

function Point({ icon: Icon, text }: Item) {
  return (
    <li className="flex items-center gap-4">
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy text-gold shadow-lg ring-4 ring-gold/30">
        <Icon className="h-7 w-7" strokeWidth={1.6} />
      </span>
      <span className="text-base font-bold leading-snug text-navy">{text}</span>
    </li>
  );
}

function BusSide() {
  return (
    <svg viewBox="0 0 400 170" className="h-auto w-full" aria-hidden="true">
      <rect x="10" y="20" width="380" height="110" rx="26" className="fill-gold" />
      <rect x="40" y="38" width="250" height="52" rx="6" className="fill-navy" />
      {[100, 160, 220].map((x) => (
        <path key={x} d={`M${x} 38V90`} className="stroke-gold" strokeWidth="3" />
      ))}
      <rect x="305" y="38" width="48" height="84" rx="6" className="fill-navy" />
      <rect x="10" y="108" width="380" height="8" className="fill-gold-dark" />
      {[95, 305].map((x) => (
        <g key={x}>
          <circle cx={x} cy="132" r="26" className="fill-navy" />
          <circle cx={x} cy="132" r="11" className="fill-gold-light" />
        </g>
      ))}
    </svg>
  );
}

export default function SafetyDiagram() {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1fr_1.1fr_1fr] lg:px-8">
      <ul className="flex flex-col gap-6">
        {RIGHT.map((p) => (
          <Point key={p.text} {...p} />
        ))}
      </ul>
      <BusSide />
      <ul className="flex flex-col gap-6">
        {LEFT.map((p) => (
          <Point key={p.text} {...p} />
        ))}
      </ul>
    </div>
  );
}
