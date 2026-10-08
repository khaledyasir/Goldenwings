// ponytail: placeholder number, swap in the real one (PHONE_TEL and WHATSAPP_LINK too)
export const PHONE_DISPLAY = "079 123 4567";
export const PHONE_TEL = "tel:+962791234567";
export const WHATSAPP_LINK = "https://wa.me/962791234567";
// ponytail: placeholder URLs, swap in the real Instagram/Facebook pages and the exact Google Business share link
export const INSTAGRAM_LINK = "https://www.instagram.com/";
export const FACEBOOK_LINK = "https://www.facebook.com/";
const MAPS_QUERY = encodeURIComponent("الأجنحة الذهبية لخدمة النقل وتأجير الحافلات الأردنية، عمّان");
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
export const BOOKING_HREF = "/booking";

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const SERVICE_LINKS = [
  { label: "نقل موظفين الشركات والمؤسسات والمصانع", href: "/employee-transport" },
  { label: "النقل السياحي المتخصص", href: "/tourism-transport" },
  { label: "النقل الدولي", href: "/international-transport" },
  { label: "نقل المطار والمعابر الحدودية", href: "/airport-transport" },
  { label: "دليل الرحلات", href: "/trips" },
];

/** Every page of the site, titles taken from the content document */
export const NAV_LINKS: NavLink[] = [
  { label: "الرئيسية", href: "/" },
  { label: "خدماتنا", href: "/#services", children: SERVICE_LINKS },
  { label: "أسطولنا", href: "/fleet" },
  { label: "الشركاء", href: "/partners" },
  { label: "آراء العملاء", href: "/testimonials" },
  { label: "الحجز", href: BOOKING_HREF },
  { label: "تواصل معنا", href: "#contact" },
  { label: "خريطة الموقع", href: "/#map" },
];

/** Logo is shown when there is one; partners without a logo file are shown by name. */
export const PARTNERS: { name: string; src?: string }[] = [
  { name: "زلوم", src: "/partners/zalloum.jpg" },
  { name: "الحياة", src: "/partners/hayat.png" },
  { name: "جهد", src: "/partners/johud.jpg" },
  { name: "كات", src: "/partners/cat.webp" },
  { name: "أبو شيخة", src: "/partners/abu-shikha.jpg" },
  { name: "سافيتو", src: "/partners/vetonit.jpg" },
  { name: "ترانسميد", src: "/partners/transmed.png" },
  { name: "وزارة التربية والتعليم", src: "/partners/moe.jpg" },
  { name: "كيبرز" },
  { name: "المتطورة" },
  { name: "ورد" },
  { name: "جونفجيتر" },
  { name: "جوردترب" },
  { name: "يلا أدفنشر" },
  { name: "فال" },
  { name: "الهلال الأحمر", src: "/partners/red-crescent.jpg" },
];

export const HOME_SERVICES = [
  {
    title: "نقل الموظفين",
    description: "تأجير الحافلات الأردنية",
    href: "/employee-transport",
  },
  {
    title: "النقل السياحي المتخصص",
    description: "رحلات سياحية بأعلى مستوى",
    href: "/tourism-transport",
  },
  {
    title: "النقل الدولي",
    description: "خدمات نقل خارج الأردن الى مختلف الوجهات",
    href: "/international-transport",
  },
];

export const VALUE_PROPS = [
  "حافلات حديثة",
  "الالتزام بمواعيد الحجوزات",
  "سائقون ذوو خبرة",
  "خدمة عملاء على مدار الساعة",
];

export type Review = { quote: string; name: string; company: string };

/** Add real client reviews here, the testimonials page renders them automatically */
export const REVIEWS: Review[] = [];

export type FleetGroup = { title: string; tiers: string[] };

export const FLEET_GROUPS: FleetGroup[] = [
  { title: "الحافلات الكبيرة", tiers: ["حافلة 50 راكب", "حافلة 33 راكب"] },
  {
    title: "الحافلات المتوسطة",
    tiers: ["كوستر 22 راكب", "كوستر 21 راكب", "كوستر 19 راكب", "كوستر 18 راكب"],
  },
  { title: "الحافلات الصغيرة", tiers: ["فان 11 راكب", "فان 7 ركاب"] },
  { title: "السيارات", tiers: ["سيدان 3 ركاب", "SUV"] },
];

export const FLEET_TIERS = FLEET_GROUPS.flatMap((g) => g.tiers);

export type Trip = { image: string; name: string; date: string; phone: string; price: string };
export type Place = { image: string; place: string; description: string };

/** Add trips here, each list renders as a carousel under its heading on the trips page. No limit on how many. */
export const ADVENTURE_TRIPS: Trip[] = [];
export const TOURISM_TRIPS: Trip[] = [];
export const PLACES: Place[] = [];
