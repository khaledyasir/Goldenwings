import type { Bi } from "@/lib/i18n";

// Contact details from the links document
export const PHONE_DISPLAY = "079 629 0390";
export const PHONE_TEL = "tel:+962796290390";
export const WHATSAPP_LINK = "https://wa.me/962796290390";
export const INSTAGRAM_LINK = "https://www.instagram.com/p/DeZrdfwChYq/?dlrf=MWVsMW42cm5yd2t5MQ==";
export const FACEBOOK_LINK = "https://web.facebook.com/GoldenWings.Transport/?_rdc=1&_rdr#";
// ponytail: still a text search for the business, swap in the exact Google Business share link when there is one
const MAPS_QUERY = encodeURIComponent("الأجنحة الذهبية لخدمة النقل وتأجير الحافلات الأردنية، عمّان");
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const mapsEmbed = (lang: string) => `https://www.google.com/maps?q=${MAPS_QUERY}&hl=${lang}&output=embed`;
export const BOOKING_HREF = "/booking";

export const COMPANY: Bi = {
  ar: "الأجنحة الذهبية لخدمة النقل وتأجير الحافلات الأردنية",
  en: "Golden Wings Jordanian Bus Rental & Transportation Services",
};
export const SLOGAN: Bi = {
  ar: "حلول نقل متكاملة تلبي تطلعاتكم",
  en: "Comprehensive transportation solutions that meet your expectations",
};

export type NavLink = {
  label: Bi;
  href: string;
  children?: { label: Bi; href: string }[];
};

export const SERVICE_LINKS = [
  {
    label: {
      ar: "نقل موظفين الشركات والمؤسسات والمصانع",
      en: "Industrial Establishments, Corporations & Companies' Employee Transportation",
    },
    href: "/employee-transport",
  },
  { label: { ar: "النقل السياحي المتخصص", en: "Specialized Tourism Transportation" }, href: "/tourism-transport" },
  { label: { ar: "النقل الدولي", en: "International Transportation" }, href: "/international-transport" },
  {
    label: { ar: "نقل المطار والمعابر الحدودية", en: "Airport and Border Crossing Transportation" },
    href: "/airport-transport",
  },
];

/** Every page of the site, titles taken from the content document */
export const NAV_LINKS: NavLink[] = [
  { label: { ar: "الرئيسية", en: "Home" }, href: "/" },
  { label: { ar: "خدماتنا", en: "Our Services" }, href: "/#services", children: SERVICE_LINKS },
  { label: { ar: "أسطولنا", en: "Our Fleet" }, href: "/fleet" },
  { label: { ar: "الشركاء", en: "Our Partners" }, href: "/partners" },
  { label: { ar: "آراء العملاء", en: "Customer Reviews" }, href: "/testimonials" },
  { label: { ar: "الحجز", en: "Booking" }, href: BOOKING_HREF },
  { label: { ar: "دليل الرحلات", en: "Trip Guide" }, href: "/trips" },
  { label: { ar: "الإدخالات", en: "Entries" }, href: "/entries" },
];

/** Logo is shown when there is one; partners without a logo file are shown by name. */
export const PARTNERS: { name: Bi; src?: string }[] = [
  { name: { ar: "زلوم", en: "Zalloum" }, src: "/partners/zalloum.jpg" },
  { name: { ar: "الحياة", en: "Al Hayat" }, src: "/partners/hayat.png" },
  { name: { ar: "جهد", en: "JOHUD" }, src: "/partners/johud.jpg" },
  { name: { ar: "كات", en: "CAT" }, src: "/partners/cat.webp" },
  { name: { ar: "أبو شيخة", en: "Abu Sheikha" }, src: "/partners/abu-shikha.jpg" },
  { name: { ar: "سافيتو", en: "Saveto" }, src: "/partners/vetonit.jpg" },
  { name: { ar: "ترانسميد", en: "Transmed" }, src: "/partners/transmed.png" },
  { name: { ar: "وزارة التربية والتعليم", en: "Ministry of Education" }, src: "/partners/moe.jpg" },
  { name: { ar: "كيبرز", en: "Keepers" } },
  { name: { ar: "المتطورة", en: "Al Mutatawwera" } },
  { name: { ar: "ورد", en: "Ward" } },
  { name: { ar: "جونفجيتر", en: "John Vegator" } },
  { name: { ar: "جوردترب", en: "JordTrip" } },
  { name: { ar: "يلا أدفنشر", en: "Yalla Adventure" } },
  { name: { ar: "فال", en: "Vaal" } },
  { name: { ar: "الهلال الأحمر", en: "the Red Crescent" }, src: "/partners/red-crescent.jpg" },
];

export const HOME_SERVICES = [
  {
    title: { ar: "نقل الموظفين", en: "Employee Transportation" },
    description: { ar: "تأجير الحافلات الأردنية", en: "Jordanian bus rental services." },
    href: "/employee-transport",
  },
  {
    title: { ar: "النقل السياحي المتخصص", en: "Specialized Tourism Transportation" },
    description: { ar: "رحلات سياحية بأعلى مستوى", en: "Premium-quality tourist trips." },
    href: "/tourism-transport",
  },
  {
    title: { ar: "النقل الدولي", en: "International Transportation" },
    description: {
      ar: "خدمات نقل خارج الأردن الى مختلف الوجهات",
      en: "Transportation services abroad to various international destinations.",
    },
    href: "/international-transport",
  },
];

export const VALUE_PROPS: Bi[] = [
  { ar: "حافلات حديثة", en: "Modern Buses" },
  { ar: "الالتزام بمواعيد الحجوزات", en: "Punctual and Reliable Bookings" },
  { ar: "سائقون ذوو خبرة", en: "Experienced Drivers" },
  { ar: "خدمة عملاء على مدار الساعة", en: "24/7 Customer Service" },
];

export type Review = { quote: string; name: string; company: string };

/** Add real client reviews here, the testimonials page renders them automatically */
export const REVIEWS: Review[] = [];

export type FleetGroup = { title: Bi; tiers: Bi[] };

export const FLEET_GROUPS: FleetGroup[] = [
  {
    title: { ar: "الحافلات الكبيرة", en: "Large Buses" },
    tiers: [
      { ar: "حافلة 50 راكب", en: "50-passenger bus" },
      { ar: "حافلة 33 راكب", en: "33-passenger bus" },
    ],
  },
  {
    title: { ar: "الحافلات المتوسطة", en: "Medium Buses" },
    tiers: [
      { ar: "كوستر 22 راكب", en: "22-passenger Coaster" },
      { ar: "كوستر 21 راكب", en: "21-passenger Coaster" },
      { ar: "كوستر 19 راكب", en: "19-passenger Coaster" },
      { ar: "كوستر 18 راكب", en: "18-passenger Coaster" },
    ],
  },
  {
    title: { ar: "الحافلات الصغيرة", en: "Small Vans" },
    tiers: [
      { ar: "فان 11 راكب", en: "11-passenger van" },
      { ar: "فان 7 ركاب", en: "7-passenger van" },
    ],
  },
  {
    title: { ar: "السيارات", en: "Cars" },
    tiers: [
      { ar: "سيدان 3 ركاب", en: "3-passenger Sedan" },
      { ar: "SUV", en: "SUV" },
    ],
  },
];

/** The Arabic name is the id, it is what the ?tier= link from the fleet page carries */
export const FLEET_TIERS = FLEET_GROUPS.flatMap((g) => g.tiers);

export type Trip = { image: string; name: string; date: string; phone: string; price: string };
export type Place = { image: string; place: string; description: string };

/** Add trips here, each list renders as a carousel under its heading on the trips page. No limit on how many. */
export const ADVENTURE_TRIPS: Trip[] = [];
export const TOURISM_TRIPS: Trip[] = [];
export const PLACES: Place[] = [];

export const EMAIL = "sales@goldenwingsjo.com";

/** Dropdown choices on the entries form. ponytail: placeholder values, replaced by dashboard-managed lists later */
export const ENTRY_OPTIONS: Record<string, Bi[]> = {
  movement: [
    { ar: "سياحة", en: "Tourism" },
    { ar: "نقل موظفين", en: "Employee Transportation" },
  ],
  type: [
    { ar: "مستأجر", en: "Rented" },
    { ar: "داخلي", en: "Internal" },
  ],
  client: [
    { ar: "شركة 1", en: "Company 1" },
    { ar: "شركة 2", en: "Company 2" },
  ],
  trip: [
    { ar: "رحلة 1", en: "Trip 1" },
    { ar: "رحلة 2", en: "Trip 2" },
  ],
  bus: [
    { ar: "حافلة 1", en: "Bus 1" },
    { ar: "حافلة 2", en: "Bus 2" },
  ],
  driver: [
    { ar: "سائق 1", en: "Driver 1" },
    { ar: "سائق 2", en: "Driver 2" },
  ],
  authorization: [
    { ar: "تفويض 1", en: "Authorization 1" },
    { ar: "تفويض 2", en: "Authorization 2" },
  ],
};
