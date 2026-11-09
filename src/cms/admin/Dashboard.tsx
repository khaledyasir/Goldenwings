import Link from "next/link";
import type { Payload } from "payload";
import {
  BookOpen,
  Bus,
  CalendarCheck,
  ClipboardList,
  Download,
  FileText,
  Handshake,
  Image as ImageIcon,
  ListChecks,
  MapPinned,
  MessageSquareQuote,
  Pencil,
  Phone,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

type Props = { payload: Payload; user?: { role?: string; name?: string | null; email?: string } | null; i18n: { language: string } };
type Lang = "ar" | "en";

const T = {
  ar: {
    hello: "أهلاً",
    intro: "ماذا تريد أن تفعل اليوم؟",
    edit: "تعديل الموقع",
    editHint: "افتح الموقع واضغط على أي نص أو صورة لتعديلها",
    view: "عرض الموقع",
    content: "محتوى الموقع",
    pages: "صفحات الموقع",
    pagesHint: "كل نصوص وصور الصفحة في مكان واحد",
    ops: "الحجوزات والعمليات",
    settings: "الإعدادات",
    newBookings: "طلبات حجز جديدة",
    month: "طلبات آخر 30 يوماً",
    today: "إدخالات اليوم",
    recentBookings: "آخر طلبات الحجز",
    recentEntries: "آخر الإدخالات",
    none: "لا توجد سجلات بعد",
    all: "عرض الكل",
    export: "تصدير Excel",
    items: "عنصر",
  },
  en: {
    hello: "Welcome",
    intro: "What would you like to do today?",
    edit: "Edit website",
    editHint: "Open the site and click any text or image to change it",
    view: "View website",
    content: "Website content",
    pages: "Website pages",
    pagesHint: "All the text and images of a page in one place",
    ops: "Bookings & operations",
    settings: "Settings",
    newBookings: "New booking requests",
    month: "Requests, last 30 days",
    today: "Entries today",
    recentBookings: "Latest booking requests",
    recentEntries: "Latest entries",
    none: "Nothing here yet",
    all: "View all",
    export: "Export to Excel",
    items: "items",
  },
};

const STATUS: Record<Lang, Record<string, string>> = {
  ar: { new: "جديد", review: "قيد المراجعة", confirmed: "مؤكد", completed: "مكتمل", cancelled: "ملغى", rejected: "مرفوض" },
  en: { new: "New", review: "Under review", confirmed: "Confirmed", completed: "Completed", cancelled: "Cancelled", rejected: "Rejected" },
};

type Tile = { href: string; icon: LucideIcon; title: [string, string]; hint: [string, string]; count?: number };

const PAGES: [string, string, string][] = [
  ["home", "الصفحة الرئيسية", "Home page"],
  ["employee-transport", "نقل الموظفين", "Employee transport"],
  ["tourism-transport", "النقل السياحي", "Tourism transport"],
  ["international-transport", "النقل الدولي", "International transport"],
  ["airport-transport", "نقل المطار والمعابر", "Airport transport"],
  ["fleet-page", "صفحة الأسطول", "Fleet page"],
  ["trips-page", "صفحة دليل الرحلات", "Trips page"],
  ["partners-page", "صفحة الشركاء", "Partners page"],
  ["testimonials-page", "صفحة آراء العملاء", "Reviews page"],
  ["booking-page", "صفحة الحجز", "Booking page"],
  ["entries-page", "صفحة الإدخالات", "Entries page"],
];

function Tiles({ tiles, lang }: { tiles: Tile[]; lang: Lang }) {
  const i = lang === "ar" ? 0 : 1;
  return (
    <div className="gw-tiles">
      {tiles.map((t) => (
        <Link key={t.href} href={t.href} className="gw-tile">
          <span className="gw-tile__icon">
            <t.icon size={22} strokeWidth={1.8} />
          </span>
          <span className="gw-tile__body">
            <strong>{t.title[i]}</strong>
            <small>{t.hint[i]}</small>
          </span>
          {t.count != null && <span className="gw-tile__count">{t.count}</span>}
        </Link>
      ))}
    </div>
  );
}

export async function Dashboard({ payload, user, i18n }: Props) {
  const lang: Lang = i18n?.language === "en" ? "en" : "ar";
  const t = T[lang];
  const role = user?.role;
  const q = { overrideAccess: false, user: user as never } as const;
  const count = async (collection: "vehicles" | "trips" | "partners" | "testimonials" | "media") =>
    (await payload.count({ collection, ...q })).totalDocs;

  const content = role === "staff" ? null : await Promise.all(["vehicles", "trips", "partners", "testimonials", "media"].map((c) => count(c as never)));
  const fmt = (d: string) => new Date(d).toLocaleString(lang === "ar" ? "ar-JO" : "en-GB", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="gw-home" dir={lang === "ar" ? "rtl" : "ltr"}>
      <header className="gw-home__hero">
        <div>
          <h1>
            {t.hello}
            {user?.name ? `، ${user.name}` : ""} 👋
          </h1>
          <p>{t.intro}</p>
        </div>
        {role !== "staff" && (
          <div className="gw-home__cta">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full navigation: the route sets the edit cookie */}
            <a className="gw-btn gw-btn--gold" href="/api/edit-mode?path=/">
              <Pencil size={18} /> {t.edit}
            </a>
            <a className="gw-btn" href="/" target="_blank" rel="noopener noreferrer">
              {t.view}
            </a>
            <small>{t.editHint}</small>
          </div>
        )}
      </header>

      {role === "owner" && <OwnerOps payload={payload} q={q} t={t} lang={lang} fmt={fmt} />}

      {role === "staff" && (
        <section>
          <h2>{t.ops}</h2>
          <Tiles
            lang={lang}
            tiles={[
              { href: "/entries", icon: ClipboardList, title: ["إدخال جديد", "New entry"], hint: ["تعبئة نموذج الإدخالات", "Fill in the entries form"] },
              { href: "/admin/collections/entries", icon: ListChecks, title: ["إدخالاتي", "My entries"], hint: ["ما أدخلته سابقاً", "What you submitted"] },
            ]}
          />
        </section>
      )}

      {content && (
        <section>
          <h2>{t.content}</h2>
          <Tiles
            lang={lang}
            tiles={[
              { href: "/admin/collections/vehicles", icon: Bus, title: ["الأسطول", "Fleet"], hint: ["الحافلات والمركبات ومزاياها", "Buses, vehicles and their features"], count: content[0] },
              { href: "/admin/collections/trips", icon: MapPinned, title: ["دليل الرحلات", "Trips"], hint: ["الرحلات والوجهات والأسعار", "Trips, destinations and prices"], count: content[1] },
              { href: "/admin/collections/partners", icon: Handshake, title: ["الشركاء", "Partners"], hint: ["الشعارات والنصوص", "Logos and details"], count: content[2] },
              { href: "/admin/collections/testimonials", icon: MessageSquareQuote, title: ["آراء العملاء", "Customer reviews"], hint: ["إضافة رأي ونشره", "Add and publish reviews"], count: content[3] },
              { href: "/admin/collections/media", icon: ImageIcon, title: ["مكتبة الصور", "Images"], hint: ["رفع الصور واستبدالها", "Upload and replace images"], count: content[4] },
            ]}
          />
        </section>
      )}

      {role !== "staff" && (
        <section>
          <h2>{t.pages}</h2>
          <p className="gw-muted">{t.pagesHint}</p>
          <div className="gw-chips">
            {PAGES.map(([slug, ar, en]) => (
              <Link key={slug} href={`/admin/globals/${slug}`} className="gw-chip">
                <FileText size={16} /> {lang === "ar" ? ar : en}
              </Link>
            ))}
          </div>
        </section>
      )}

      {role !== "staff" && (
        <section>
          <h2>{t.settings}</h2>
          <Tiles
            lang={lang}
            tiles={[
              { href: "/admin/globals/settings", icon: Phone, title: ["معلومات التواصل والقوائم", "Contact details & menus"], hint: ["الهاتف وواتساب والبريد والشعار والقوائم", "Phone, WhatsApp, email, logo, menus"] },
              ...(role === "owner"
                ? [
                    { href: "/admin/collections/users", icon: Users, title: ["المستخدمون", "Users"], hint: ["إضافة موظف أو محرر", "Add staff or editors"] } as Tile,
                    { href: "/admin/collections/entry-options", icon: Settings, title: ["قوائم نموذج الإدخالات", "Entry form lists"], hint: ["العملاء والسائقون والحافلات", "Clients, drivers, buses"] } as Tile,
                  ]
                : []),
              { href: "/admin/collections/fleet-categories", icon: BookOpen, title: ["فئات الأسطول والمزايا", "Fleet categories & amenities"], hint: ["تنظيم الأسطول ومزاياه", "Organise the fleet"] },
            ]}
          />
        </section>
      )}
    </div>
  );
}

async function OwnerOps({
  payload,
  q,
  t,
  lang,
  fmt,
}: {
  payload: Payload;
  q: { overrideAccess: false; user: never };
  t: (typeof T)["ar"];
  lang: Lang;
  fmt: (d: string) => string;
}) {
  // Server component rendered per request: reading the clock here is intended
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const since = new Date(now - 30 * 864e5).toISOString();
  const today = new Date(new Date(now).setHours(0, 0, 0, 0)).toISOString();
  const [fresh, month, todays, bookings, entries] = await Promise.all([
    payload.count({ collection: "bookings", where: { status: { equals: "new" } }, ...q }),
    payload.count({ collection: "bookings", where: { createdAt: { greater_than_equal: since } }, ...q }),
    payload.count({ collection: "entries", where: { createdAt: { greater_than_equal: today } }, ...q }),
    payload.find({ collection: "bookings", sort: "-createdAt", limit: 5, depth: 0, ...q }),
    payload.find({ collection: "entries", sort: "-createdAt", limit: 5, depth: 0, ...q }),
  ]);
  return (
    <section>
      <h2>{t.ops}</h2>
      <div className="gw-stats">
        <Link href="/admin/collections/bookings?where[status][equals]=new" className={`gw-stat ${fresh.totalDocs ? "gw-stat--alert" : ""}`}>
          <CalendarCheck size={22} />
          <strong>{fresh.totalDocs}</strong>
          <span>{t.newBookings}</span>
        </Link>
        <Link href="/admin/collections/bookings" className="gw-stat">
          <CalendarCheck size={22} />
          <strong>{month.totalDocs}</strong>
          <span>{t.month}</span>
        </Link>
        <Link href="/admin/collections/entries" className="gw-stat">
          <ClipboardList size={22} />
          <strong>{todays.totalDocs}</strong>
          <span>{t.today}</span>
        </Link>
      </div>
      <div className="gw-lists">
        <div className="gw-card">
          <div className="gw-card__head">
            <h3>{t.recentBookings}</h3>
            <Link href="/admin/collections/bookings">{t.all}</Link>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- file download from an API route */}
            <a href="/api/export?collection=bookings">
              <Download size={14} /> {t.export}
            </a>
          </div>
          {bookings.docs.length === 0 && <p className="gw-muted">{t.none}</p>}
          {bookings.docs.map((b) => (
            <Link key={b.id} href={`/admin/collections/bookings/${b.id}`} className="gw-row">
              <span>
                <strong>{b.name}</strong> <small>{b.reference}</small>
              </span>
              <span className={`gw-status gw-status--${b.status}`}>{STATUS[lang][b.status] ?? b.status}</span>
              <small className="gw-muted">{fmt(b.createdAt)}</small>
            </Link>
          ))}
        </div>
        <div className="gw-card">
          <div className="gw-card__head">
            <h3>{t.recentEntries}</h3>
            <Link href="/admin/collections/entries">{t.all}</Link>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- file download from an API route */}
            <a href="/api/export?collection=entries">
              <Download size={14} /> {t.export}
            </a>
          </div>
          {entries.docs.length === 0 && <p className="gw-muted">{t.none}</p>}
          {entries.docs.map((e) => (
            <Link key={e.id} href={`/admin/collections/entries/${e.id}`} className="gw-row">
              <span>
                <strong>{e.client}</strong> <small>{e.movement}</small>
              </span>
              <small className="gw-muted">{fmt(e.createdAt)}</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
