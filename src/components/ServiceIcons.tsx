import {
  Bus,
  Car,
  ClipboardCheck,
  Headphones,
  HandHelping,
  Headset,
  MapPinned,
  Route,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// ponytail: texts copied from the client's reference icon grid
type Item = { icon: LucideIcon; text: string };

const TOP: Item[] = [
  { icon: Route, text: "تخطيط المسارات" },
  { icon: MapPinned, text: "الخدمات اللوجستية" },
  { icon: Headset, text: "فريق تنسيق متخصص" },
  { icon: Headphones, text: "مسؤول تواصل مخصص للعملاء" },
];

const BUSES: Item[] = [
  { icon: Bus, text: "أسطول حديث" },
  { icon: Car, text: "مركبات مخصصة حسب الطلب" },
  { icon: ClipboardCheck, text: "تأمين شامل" },
  { icon: HandHelping, text: "تغطية الأعطال ونقل الطوارئ" },
  { icon: Wrench, text: "الصيانة الدورية وغسل المركبات" },
];

function Grid({ items }: { items: Item[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
      {items.map(({ icon: Icon, text }) => (
        <li key={text} className="flex flex-col items-center gap-4 text-center">
          <Icon className="h-14 w-14 text-gold-dark" strokeWidth={1.2} />
          <span className="text-sm font-bold leading-snug text-navy">{text}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ServiceIcons() {
  return (
    <div className="mx-auto max-w-6xl px-4 lg:px-8">
      <Grid items={TOP} />
      <h3 className="mb-10 mt-16 text-center text-2xl font-extrabold text-navy">الحافلات والليموزين</h3>
      <Grid items={BUSES} />
    </div>
  );
}
