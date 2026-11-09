import type { ArrayField, Field, GroupField, TextField, TextareaField, UploadField } from "payload";
import { ICON_NAMES } from "../lib/icons";

type Bi = { ar: string; en: string };
const L = (ar: string, en: string): Bi => ({ ar, en });

/**
 * Admin labels by field name, so every field reads in plain Arabic/English instead of its code name.
 * A label passed explicitly to a helper wins.
 */
const LABELS: Record<string, Bi> = {
  title: L("العنوان", "Title"),
  subtitle: L("العنوان الفرعي", "Subtitle"),
  description: L("الوصف", "Description"),
  text: L("النص", "Text"),
  image: L("الصورة", "Image"),
  imageAlt: L("وصف الصورة في هذا المكان (اختياري)", "Image description here (optional)"),
  href: L("الرابط", "Link"),
  icon: L("الأيقونة", "Icon"),
  label: L("النص الظاهر", "Label"),
  name: L("الاسم", "Name"),
  hero: L("الواجهة الرئيسية للصفحة", "Page banner"),
  seo: L("محركات البحث (جوجل)", "Search engines (Google)"),
  bookLabel: L("نص زر الحجز", "Booking button text"),
  intro: L("الفقرة التعريفية", "Introduction"),
  stats: L("سطر الأرقام", "Statistics line"),
  features: L("المزايا", "Features"),
  sections: L("الأقسام", "Sections"),
  closing: L("الجملة الختامية", "Closing line"),
  whyTitle: L("عنوان «لماذا تختارنا»", "“Why choose us” title"),
  why: L("أسباب الاختيار", "Reasons"),
  services: L("الخدمات", "Services"),
  servicesTitle: L("عنوان قسم الخدمات", "Services heading"),
  partnersTitle: L("عنوان قسم الشركاء", "Partners heading"),
  valueProps: L("مزايا الشريط الأزرق", "Highlights strip"),
  mapTitle: L("عنوان الخريطة", "Map heading"),
  countries: L("الدول", "Countries"),
  mapImage: L("صورة الخريطة", "Map image"),
  cards: L("البطاقات", "Cards"),
  points: L("النقاط", "Points"),
  bold: L("سطر بخط عريض", "Bold line"),
  more: L("فقرة إضافية", "Extra paragraph"),
  categoriesHeading: L("عنوان الفئات", "Categories heading"),
  seatsLabel: L("نص عدد المقاعد", "Seats text"),
  seatsLabelFew: L("نص عدد المقاعد (10 أو أقل)", "Seats text (10 or fewer)"),
  safety: L("مزايا الأمان", "Safety features"),
  sub: L("سطر توضيحي", "Detail line"),
  imageLabel: L("نص مكان الصورة الفارغ", "Empty image placeholder text"),
  placeholder: L("نصوص البطاقات قبل إضافة آراء حقيقية", "Card text before real reviews exist"),
  company: L("الشركة", "Company"),
  quote: L("نص التقييم", "Review text"),
  labels: L("عناوين الحقول والأزرار", "Field and button labels"),
  note: L("الملاحظة أسفل النموذج", "Note under the form"),
  success: L("رسالة النجاح", "Success message"),
  error: L("رسالة الخطأ", "Error message"),
  sendWhatsapp: L("نص زر واتساب", "WhatsApp button text"),
  nav: L("القائمة الرئيسية", "Main menu"),
  children: L("القائمة المنسدلة", "Dropdown items"),
  footerLinks: L("روابط الفوتر", "Footer links"),
  facebookUrl: L("رابط فيسبوك", "Facebook link"),
  instagramUrl: L("رابط إنستغرام", "Instagram link"),
  mapsUrl: L("رابط خرائط جوجل (اختياري)", "Google Maps link (optional)"),
  // shared labels / form labels
  call: L("زر الاتصال", "Call button"),
  bookNow: L("زر احجز الآن", "Book now button"),
  ourServices: L("عنوان «خدماتنا»", "“Our services” heading"),
  contactUs: L("عنوان «تواصل معنا»", "“Contact us” heading"),
  whatsapp: L("واتساب", "WhatsApp"),
  email: L("البريد الإلكتروني", "Email"),
  facebook: L("فيسبوك", "Facebook"),
  instagram: L("إنستغرام", "Instagram"),
  openMenu: L("زر فتح القائمة (للجوال)", "Open-menu button (mobile)"),
  copyright: L("سطر حقوق النشر", "Copyright line"),
  phone: L("الهاتف", "Phone"),
  vehicle: L("المركبة", "Vehicle"),
  start: L("تاريخ البداية", "Start date"),
  end: L("تاريخ النهاية", "End date"),
  from: L("نقطة الانطلاق", "Departure"),
  to: L("نقطة الوصول", "Destination"),
  message: L("التعليق", "Comment"),
  submit: L("زر الإرسال", "Submit button"),
  movement: L("الحركة", "Activity"),
  type: L("النوع", "Type"),
  client: L("العميل", "Client"),
  trip: L("الرحلة", "Trip"),
  date: L("التاريخ", "Date"),
  bus: L("رقم الحافلة", "Bus number"),
  driver: L("السائق", "Driver"),
  authorization: L("رقم التفويض", "Authorization number"),
  statement: L("بيان", "Statement"),
  select: L("نص «اختر»", "“Select” text"),
  item: L("المحطة / النشاط", "Stop / activity"),
};

/** Singular name of one row in a list, e.g. "Add خدمة" */
const ROW: Record<string, Bi> = {
  nav: L("رابط", "Link"),
  children: L("رابط فرعي", "Sub-link"),
  footerLinks: L("رابط", "Link"),
  services: L("خدمة", "Service"),
  valueProps: L("ميزة", "Highlight"),
  features: L("ميزة", "Feature"),
  sections: L("قسم", "Section"),
  why: L("سبب", "Reason"),
  countries: L("دولة", "Country"),
  cards: L("بطاقة", "Card"),
  points: L("نقطة", "Point"),
  safety: L("ميزة أمان", "Safety feature"),
  itinerary: L("محطة", "Stop"),
};

const withLabel = <T extends { name: string; label?: unknown }>(f: T): T => (f.label || !LABELS[f.name] ? f : { ...f, label: LABELS[f.name] });

/** Localized one-line text (Arabic + English) */
export const text = (name: string, extra: Partial<TextField> = {}): TextField =>
  withLabel({ name, type: "text", localized: true, ...extra } as TextField);

/** Localized multi-line text. Rendered as plain text, never HTML. `[word]` renders highlighted in gold where noted. */
export const area = (name: string, extra: Partial<TextareaField> = {}): TextareaField =>
  withLabel({ name, type: "textarea", localized: true, ...extra } as TextareaField);

export const image = (name: string, extra: Partial<UploadField> = {}): UploadField =>
  withLabel({ name, type: "upload", relationTo: "media", ...extra } as UploadField);

/** Arabic/English names for the icon picker instead of code names */
const ICON_LABELS: Record<string, Bi> = {
  Armchair: L("مقعد", "Seat"),
  BriefcaseMedical: L("إسعافات أولية", "First aid"),
  Building2: L("مبنى / شركة", "Building"),
  Bus: L("حافلة", "Bus"),
  Cctv: L("كاميرا مراقبة", "CCTV"),
  Check: L("علامة صح", "Check"),
  ClipboardCheck: L("تأمين / وثيقة", "Insurance / document"),
  Clock: L("ساعة / مواعيد", "Clock"),
  Compass: L("بوصلة / استشارات", "Compass"),
  DoorOpen: L("باب", "Door"),
  Factory: L("مصنع", "Factory"),
  Fan: L("مروحة / تهوية", "Fan"),
  FileText: L("عقد / ملف", "Contract / file"),
  Globe: L("كرة أرضية / دولي", "Globe"),
  GraduationCap: L("قبعة تخرج / طلاب", "Students"),
  Headset: L("خدمة عملاء", "Customer service"),
  Landmark: L("معلم / جسر", "Landmark"),
  Lightbulb: L("إنارة", "Lighting"),
  MapPin: L("موقع", "Location"),
  Mountain: L("جبل / سياحة", "Mountain"),
  Plane: L("طائرة / مطار", "Plane"),
  PlugZap: L("قابس كهربائي", "Power outlet"),
  Radio: L("نظام مراقبة", "Monitoring"),
  Refrigerator: L("ثلاجة", "Refrigerator"),
  ShieldCheck: L("درع / أمان", "Shield"),
  ShieldPlus: L("معدات سلامة", "Safety kit"),
  Snowflake: L("تبريد", "Cooling"),
  Star: L("نجمة", "Star"),
  Toilet: L("دورة مياه", "Restroom"),
  Tv: L("شاشة", "Screen"),
  Usb: L("شاحن USB", "USB"),
  User: L("شخص", "Person"),
  UserCheck: L("سائق محترف", "Driver"),
  Users: L("مجموعة أشخاص", "People"),
  Volume2: L("نظام صوتي", "Sound"),
  Wifi: L("إنترنت", "Wi-Fi"),
  Wrench: L("صيانة", "Maintenance"),
};

export const icon = (name = "icon"): Field =>
  withLabel({
    name,
    type: "select" as const,
    options: ICON_NAMES.map((n) => ({ label: ICON_LABELS[n] ?? L(n, n), value: n })),
  });

/** A repeatable list. Rows are titled by their own text (see RowLabel) and named in the user's language. */
export const list = (name: string, fields: Field[], extra: Partial<ArrayField> = {}): ArrayField =>
  withLabel({
    name,
    type: "array",
    fields,
    ...(ROW[name] && { labels: { singular: ROW[name], plural: LABELS[name] ?? ROW[name] } }),
    ...extra,
    admin: { components: { RowLabel: "@/cms/admin/RowLabel#RowLabel" }, ...extra.admin },
  } as ArrayField);

export const group = (name: string, fields: Field[], label?: Bi | string): GroupField =>
  withLabel({ name, type: "group" as const, label, fields });

/** Page title / description for search engines */
export const seo = (): GroupField => ({
  ...group("seo", [
    text("title", { label: L("عنوان الصفحة في جوجل", "Page title in Google") }),
    area("description", { label: L("وصف الصفحة في جوجل", "Page description in Google") }),
  ]),
  admin: { description: L("يظهر في نتائج البحث وتبويب المتصفح فقط", "Only shown in search results and the browser tab") },
});

/** Site path (not `//host` or `/\host`, which browsers treat as another site), http(s), tel: or mailto: */
export const HREF = /^(\/(?![/\\])\S*|https?:\/\/\S+|tel:\S+|mailto:\S+)$/;

/** Wraps text in Unicode left-to-right isolate marks (LRI … PDI) */
const ltr = (s: string) => `⁦${s}⁩`;

/** A link target: a site path such as /fleet or a full https URL */
export const href = (name = "href", required = true): TextField =>
  withLabel({
    name,
    type: "text",
    required,
    // ltr() keeps the Latin examples from being reordered inside the Arabic sentence
    admin: { className: "gw-ltr", description: L(`صفحة من الموقع مثل ${ltr("/fleet")} أو رابط كامل يبدأ بـ ${ltr("https://")}`, "A site page like /fleet or a full https:// link") },
    validate: (v: unknown) =>
      !v && !required ? true : typeof v === "string" && HREF.test(v) ? true : `مثال: ${ltr("/fleet")} أو ${ltr("https://…")} (e.g. /fleet or https://…)`,
  });
