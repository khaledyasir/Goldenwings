import type { Field, GlobalConfig } from "payload";
import { isContentTeam, publishedOrTeam } from "./access";
import { area, group, href, icon, image, list, seo, text } from "./fields";

const L = (ar: string, en: string) => ({ ar, en });

const access: GlobalConfig["access"] = {
  // Visitors only ever get the published version, also when they ask the REST API for ?draft=true
  read: publishedOrTeam,
  readVersions: isContentTeam,
  update: isContentTeam,
};

const hidden = ({ user }: { user: unknown }) => (user as { role?: string } | null)?.role === "staff";

/** One global per public page: typed sections, drafts, revision history with restore */
const page = (slug: string, label: { ar: string; en: string }, path: string, fields: Field[]): GlobalConfig => ({
  slug,
  label,
  access,
  // validate drafts too: restoring a version publishes it without re-validating
  versions: { drafts: { validate: true }, max: 50 },
  admin: {
    group: L("صفحات الموقع", "Website pages"),
    hidden,
    // Opens the real page in edit mode, showing this draft
    preview: () => `/api/edit-mode?path=${encodeURIComponent(path)}`,
  },
  fields: [seo(), ...fields],
});

const hero = (...fields: Field[]) => group("hero", [image("image", { label: L("صورة الخلفية", "Background image") }), ...fields]);

export const Settings: GlobalConfig = {
  slug: "settings",
  label: L("إعدادات الموقع العامة", "Site settings"),
  access,
  // validate drafts too: restoring a version publishes it without re-validating
  versions: { drafts: { validate: true }, max: 50 },
  admin: { group: L("الإعدادات", "Settings"), hidden, preview: () => "/api/edit-mode?path=/" },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: L("عام", "General"),
          fields: [
            text("companyName", { required: true, label: L("اسم الشركة", "Business name") }),
            area("slogan", { label: L("الشعار النصي", "Slogan") }),
            image("logo", { label: L("الشعار (الهيدر والفوتر)", "Logo (header and footer)") }),
            seo(),
          ],
        },
        {
          label: L("التواصل", "Contact"),
          fields: [
            { name: "phoneDisplay", type: "text", required: true, label: L("رقم الهاتف كما يظهر", "Phone as displayed"), admin: { className: "gw-ltr" } },
            {
              name: "phoneIntl",
              type: "text",
              required: true,
              label: L("رقم الهاتف الدولي (+962...)", "Phone in international format"),
              admin: { className: "gw-ltr" },
              validate: (v: unknown) => (typeof v === "string" && /^\+\d{8,15}$/.test(v) ? true : "Format: +962796290390"),
            },
            {
              name: "whatsapp",
              type: "text",
              required: true,
              label: L("رقم واتساب بدون + (962...)", "WhatsApp number, digits only"),
              admin: { className: "gw-ltr" },
              validate: (v: unknown) => (typeof v === "string" && /^\d{8,15}$/.test(v) ? true : "Digits only, e.g. 962796290390"),
            },
            { name: "email", type: "email", required: true, label: L("البريد الإلكتروني", "Email"), admin: { className: "gw-ltr" } },
            href("facebookUrl", false),
            href("instagramUrl", false),
            text("address", { label: L("العنوان", "Address") }),
            { name: "mapsQuery", type: "text", label: L("اسم النشاط على خرائط جوجل", "Google Maps search text") },
            href("mapsUrl", false),
          ],
        },
        {
          label: L("القوائم", "Navigation"),
          fields: [
            list(
              "nav",
              [
                text("label", { required: true }),
                href(),
                list("children", [text("label", { required: true }), href(), icon()]),
              ],
              { label: L("القائمة الرئيسية", "Main menu") },
            ),
            list("footerLinks", [text("label", { required: true }), href()], { label: L("روابط الفوتر", "Footer links") }),
          ],
        },
        {
          label: L("نصوص عامة", "Shared labels"),
          fields: [
            group("labels", [
              text("call"),
              text("bookNow"),
              text("ourServices"),
              text("contactUs"),
              text("whatsapp"),
              text("email"),
              text("facebook"),
              text("instagram"),
              text("openMenu"),
              text("copyright", { admin: { description: L("{year} يُستبدل بالسنة الحالية", "{year} becomes the current year") } }),
            ]),
          ],
        },
      ],
    },
  ],
};

export const Home = page("home", L("الصفحة الرئيسية", "Home page"), "/", [
  hero(area("title"), area("description")),
  text("servicesTitle"),
  list("services", [text("title", { required: true }), area("description"), href(), image("image"), icon()]),
  text("partnersTitle"),
  list("valueProps", [text("text", { required: true }), icon()]),
  text("mapTitle"),
]);

export const EmployeeTransport = page("employee-transport", L("نقل الموظفين", "Employee transport"), "/employee-transport", [
  hero(area("title"), text("bookLabel")),
  area("intro"),
  area("stats", { admin: { description: L("الأرقام بين قوسين [ ] تظهر كبيرة وباللون الذهبي", "Numbers in [brackets] are shown large in gold") } }),
  list("features", [icon(), area("text", { required: true })]),
]);

export const TourismTransport = page("tourism-transport", L("النقل السياحي", "Tourism transport"), "/tourism-transport", [
  hero(
    text("title", { admin: { description: L("الكلمات بين قوسين [ ] تظهر باللون الذهبي", "Words in [brackets] are shown in gold") } }),
    text("subtitle"),
    area("description"),
  ),
  // imageAlt: the same photo is described differently here than on the home page
  list("sections", [icon(), area("text", { required: true }), image("image"), text("imageAlt")]),
  text("closing"),
  text("whyTitle"),
  list("why", [text("text", { required: true })]),
]);

export const InternationalTransport = page(
  "international-transport",
  L("النقل الدولي", "International transport"),
  "/international-transport",
  [
    hero(area("title"), text("subtitle"), area("description")),
    list("services", [text("title", { required: true }), area("text"), area("bold"), area("more"), image("image")]),
    list("countries", [text("name", { required: true })]),
    image("mapImage"),
  ],
);

export const AirportTransport = page("airport-transport", L("نقل المطار والمعابر", "Airport transport"), "/airport-transport", [
  hero(area("title"), area("description")),
  area("intro"),
  list("cards", [icon(), text("title", { required: true }), area("text"), list("points", [area("text", { required: true })])]),
]);

export const FleetPage = page("fleet-page", L("صفحة الأسطول", "Fleet page"), "/fleet", [
  text("title"),
  text("categoriesHeading"),
  text("seatsLabel", { admin: { description: L("{n} يُستبدل بعدد الركاب", "{n} becomes the passenger count") } }),
  text("seatsLabelFew", { admin: { description: L("للمركبات بـ 10 مقاعد أو أقل. {n} يُستبدل بعدد الركاب", "For 10 seats or fewer. {n} becomes the passenger count") } }),
  list("safety", [icon(), text("text", { required: true }), area("sub")]),
]);

export const TripsPage = page("trips-page", L("صفحة دليل الرحلات", "Trips page"), "/trips", [
  text("title"),
  area("description"),
  text("imageLabel"),
]);

export const PartnersPage = page("partners-page", L("صفحة الشركاء", "Partners page"), "/partners", [text("title")]);

export const TestimonialsPage = page("testimonials-page", L("صفحة آراء العملاء", "Reviews page"), "/testimonials", [
  text("title"),
  group("placeholder", [text("name"), text("company"), text("quote")]),
]);

export const BookingPage = page("booking-page", L("صفحة الحجز", "Booking page"), "/booking", [
  text("title"),
  group("labels", [
    text("name"),
    text("phone"),
    text("email"),
    text("vehicle"),
    text("start"),
    text("end"),
    text("from"),
    text("to"),
    text("message"),
    text("submit"),
  ]),
  area("note"),
  area("success", { admin: { description: L("{ref} يُستبدل برقم الطلب", "{ref} becomes the booking reference") } }),
  text("error"),
  text("sendWhatsapp"),
]);

export const EntriesPage = page("entries-page", L("صفحة الإدخالات", "Entries page"), "/entries", [
  text("title"),
  group("labels", [
    text("movement"),
    text("type"),
    text("client"),
    text("trip"),
    text("date"),
    text("bus"),
    text("driver"),
    text("authorization"),
    text("statement"),
    text("select"),
    text("submit"),
  ]),
  text("success"),
  text("error"),
]);

export const globals = [
  Settings,
  Home,
  EmployeeTransport,
  TourismTransport,
  InternationalTransport,
  AirportTransport,
  FleetPage,
  TripsPage,
  PartnersPage,
  TestimonialsPage,
  BookingPage,
  EntriesPage,
];
