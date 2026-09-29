export const PHONE_DISPLAY = "079 123 4567";
export const PHONE_TEL = "tel:+962791234567";
export const WHATSAPP_LINK = "https://wa.me/962791234567";
// ponytail: placeholder URLs, swap in the real Instagram/Facebook pages and the exact Google Business share link
export const INSTAGRAM_LINK = "https://www.instagram.com/";
export const FACEBOOK_LINK = "https://www.facebook.com/";
const MAPS_QUERY = encodeURIComponent("الأجنحة الذهبية لخدمة النقل وتأجير الحافلات الأردنية، عمّان");
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
/** Booking form anchor on the contact page */
export const BOOKING_HREF = "/contact#booking";

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  {
    label: "خدماتنا",
    href: "/services",
    children: [
      { label: "نقل الموظفين", href: "/employee-transport" },
      { label: "النقل السياحي المتخصص", href: "/tourism-transport" },
      { label: "النقل الدولي", href: "/international-transport" },
      { label: "المطار والمعابر الحدودية", href: "/airport-transport" },
    ],
  },
  { label: "أسطولنا", href: "/fleet" },
  { label: "عملائنا", href: "/partners" },
  { label: "الرحلات", href: "/trips" },
  { label: "آراء العملاء", href: "/testimonials" },
  { label: "الحجز والاستفسار", href: BOOKING_HREF },
  { label: "تواصل معنا", href: "/contact" },
];

// ponytail: add a `caption` to any partner to replace the placeholder shown on hover
export const PARTNERS: { name: string; src: string; caption?: string }[] = [
  { name: "CAT", src: "/partners/cat.webp" },
  { name: "Transmed", src: "/partners/transmed.png" },
  { name: "مجموعة زلوم", src: "/partners/zalloum.jpg" },
  { name: "حياة فارماسيوتيكال", src: "/partners/hayat.png" },
  { name: "الهلال الأحمر الأردني", src: "/partners/red-crescent.jpg" },
  { name: "جهد", src: "/partners/johud.jpg" },
  { name: "أبو شيخة", src: "/partners/abu-shikha.jpg" },
  { name: "فيتونيت", src: "/partners/vetonit.jpg" },
  { name: "وزارة التربية والتعليم", src: "/partners/moe.jpg" },
];

export const HOME_SERVICES = [
  {
    title: "نقل موظفين (تأجير الحافلات الأردنية)",
    description: "حلول نقل يومية ومنظمة لشركتك من وإلى مواقع العمل",
    href: "/employee-transport",
  },
  {
    title: "النقل السياحي المتخصص",
    description: "رحلات سياحية منظمة بأعلى مستويات الراحة",
    href: "/tourism-transport",
  },
  {
    title: "النقل الدولي",
    description: "خدمات نقل خارج الأردن إلى مختلف الوجهات",
    href: "/international-transport",
  },
];

export const VALUE_PROPS = [
  {
    title: "حافلات حديثة",
    description: "حافلات حديثة ومجهزة بأعلى معايير السلامة",
  },
  {
    title: "الالتزام بمواعيد الحجوزات",
    description: "نصل في الوقت المحدد كل يوم",
  },
  {
    title: "سائقون ذوو خبرة",
    description: "سائقون مدربون وذو خبرة على أعلى مستوى",
  },
  {
    title: "خدمة عملاء على مدار الساعة",
    description: "متابعة مستمرة ودعم على مدار الساعة",
  },
];

export type Review = { quote: string; name: string; company: string };

/** Add real client reviews here, the testimonials page renders them automatically. While empty it shows labeled placeholder cards. */
export const REVIEWS: Review[] = [];

/** Vehicle tiers (الفئات), same vehicle differing by a single seat is one tier. Used by the fleet page and the booking form. */
const TIERS = [
  { type: "حافلة", seats: "50", max: 50 },
  { type: "حافلة", seats: "33", max: 33 },
  { type: "كوستر", seats: "21 - 22", max: 22 },
  { type: "كوستر", seats: "18 - 19", max: 19 },
  { type: "مرسيدس", seats: "8", max: 8 },
  { type: "فان", seats: "7", max: 7 },
];
export const FLEET_TIERS = TIERS.map((t) => ({
  ...t,
  name: `${t.type} ${t.seats} ${t.max > 10 ? "راكب" : "ركاب"}`,
}));

export const BOOKING_STEPS = [
  "حدد حافلتك",
  "حدد الوقت والتاريخ",
  "حدد مكان الانطلاق والوصول",
  "ستصلك رسالة تأكيد الحجز",
];
