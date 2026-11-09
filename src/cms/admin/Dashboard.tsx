import type { Payload } from "payload";
import { EditSiteLink } from "./EditSiteLink";

type Props = { payload: Payload; user?: { role?: string } | null };

const links = [
  ["/admin/globals/settings", "إعدادات الموقع"],
  ["/admin/collections/vehicles", "المركبات"],
  ["/admin/collections/trips", "الرحلات"],
  ["/admin/collections/partners", "الشركاء"],
  ["/admin/collections/testimonials", "آراء العملاء"],
  ["/admin/collections/media", "مكتبة الوسائط"],
] as const;

const STATUS: Record<string, string> = {
  new: "جديد", review: "قيد المراجعة", confirmed: "مؤكد", completed: "مكتمل", cancelled: "ملغى", rejected: "مرفوض",
};

const card = {
  padding: 16,
  borderRadius: 6,
  background: "var(--theme-elevation-50)",
  border: "1px solid var(--theme-elevation-100)",
} as const;
const fmt = (d: string) => new Date(d).toLocaleString("ar-JO", { dateStyle: "medium", timeStyle: "short" });

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={card}>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
      <div style={{ color: "var(--theme-elevation-600)" }}>{label}</div>
    </div>
  );
}

function Recent({ title, rows }: { title: string; rows: { href: string; text: string; sub: string }[] }) {
  return (
    <div style={card}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      {rows.length === 0 && <p style={{ margin: 0, color: "var(--theme-elevation-600)" }}>لا توجد سجلات بعد</p>}
      {rows.map((r) => (
        <a key={r.href} href={r.href} style={{ display: "block", padding: "6px 0", color: "inherit", textDecoration: "none", borderTop: "1px solid var(--theme-elevation-100)" }}>
          <strong>{r.text}</strong>
          <span style={{ color: "var(--theme-elevation-600)" }}> · {r.sub}</span>
        </a>
      ))}
    </div>
  );
}

async function OwnerStats({ payload, user }: { payload: Payload; user: NonNullable<Props["user"]> }) {
  // ponytail: cast because Props.user is structural; swap for payload's TypedUser once types are generated
  const q = { overrideAccess: false, user: user as never } as const;
  // Server component rendered per request: reading the clock here is intended
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const since = new Date(now - 30 * 864e5).toISOString();
  const today = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  const [fresh, month, todays, bookings, entries] = await Promise.all([
    payload.count({ collection: "bookings", where: { status: { equals: "new" } }, ...q }),
    payload.count({ collection: "bookings", where: { createdAt: { greater_than_equal: since } }, ...q }),
    payload.count({ collection: "entries", where: { createdAt: { greater_than_equal: today } }, ...q }),
    payload.find({ collection: "bookings", sort: "-createdAt", limit: 5, depth: 0, ...q }),
    payload.find({ collection: "entries", sort: "-createdAt", limit: 5, depth: 0, ...q }),
  ]);
  return (
    <>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", marginBottom: 16 }}>
        <Stat label="طلبات حجز جديدة" value={fresh.totalDocs} />
        <Stat label="طلبات آخر 30 يوم" value={month.totalDocs} />
        <Stat label="إدخالات اليوم" value={todays.totalDocs} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {[
          ["/api/export?collection=bookings", "تصدير طلبات الحجز (CSV)"],
          ["/api/export?collection=bookings&status=new", "تصدير الطلبات الجديدة (CSV)"],
          ["/api/export?collection=entries", "تصدير الإدخالات (CSV)"],
          ["/admin/collections/entry-options", "قوائم نموذج الإدخالات"],
        ].map(([href, label]) => (
          <a key={href} href={href} style={{ ...card, padding: "8px 14px", color: "inherit", textDecoration: "none" }}>
            {label}
          </a>
        ))}
      </div>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <Recent
          title="آخر طلبات الحجز"
          rows={bookings.docs.map((b) => ({
            href: `/admin/collections/bookings/${b.id}`,
            text: `${b.reference} - ${b.name}`,
            sub: `${STATUS[b.status] ?? b.status} · ${fmt(b.createdAt)}`,
          }))}
        />
        <Recent
          title="آخر الإدخالات"
          rows={entries.docs.map((e) => ({
            href: `/admin/collections/entries/${e.id}`,
            text: `${e.client} - ${e.movement}`,
            sub: fmt(e.createdAt),
          }))}
        />
      </div>
    </>
  );
}

export async function Dashboard({ payload, user }: Props) {
  return (
    <section dir="rtl" style={{ marginBottom: 24 }}>
      <div style={{ maxWidth: 360, fontSize: 18 }}>
        <EditSiteLink />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "0 0 16px" }}>
        {links.map(([href, label]) => (
          <a key={href} href={href} style={{ ...card, padding: "8px 14px", color: "inherit", textDecoration: "none" }}>
            {label}
          </a>
        ))}
      </div>
      {user?.role === "owner" && <OwnerStats payload={payload} user={user} />}
    </section>
  );
}
