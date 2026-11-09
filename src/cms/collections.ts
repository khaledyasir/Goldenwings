import type { CollectionConfig, Field, Payload } from "payload";
import { APIError } from "payload";
import { isContentTeam, isOwner, ownerField, publishedLiveOrTeam } from "./access";
import { area, href, icon, image, list, text } from "./fields";

const L = (ar: string, en: string) => ({ ar, en });
const CONTENT = L("محتوى الموقع", "Website content");
const OPS = L("العمليات", "Operations");

const contentAccess = {
  read: publishedLiveOrTeam,
  // Explicit: Payload's default would let any signed-in user (staff too) read drafts and history
  readVersions: isContentTeam,
  create: isContentTeam,
  update: isContentTeam,
  delete: isContentTeam,
};
/** Staff accounts only submit entries; keep the website content out of their admin */
const hiddenFromStaff = ({ user }: { user: unknown }) => (user as { role?: string } | null)?.role === "staff";

/** Publishable, orderable, recoverable content */
const content = (c: Omit<CollectionConfig, "access">): CollectionConfig => ({
  versions: { drafts: true, maxPerDoc: 30 },
  orderable: true,
  trash: true,
  access: contentAccess,
  ...c,
  admin: { group: CONTENT, hidden: hiddenFromStaff, ...c.admin },
});

// ---------------------------------------------------------------- users

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: L("مستخدم", "User"), plural: L("المستخدمون", "Users") },
  admin: { useAsTitle: "email", defaultColumns: ["name", "email", "role"], group: L("الإعدادات", "Settings") },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    cookies: { sameSite: "Lax", secure: process.env.NODE_ENV === "production" },
  },
  access: {
    read: ({ req }) => (isOwner({ req }) ? true : req.user ? { id: { equals: req.user.id } } : false),
    create: isOwner,
    update: ({ req }) => (isOwner({ req }) ? true : req.user ? { id: { equals: req.user.id } } : false),
    delete: isOwner,
    unlock: isOwner,
  },
  hooks: {
    // No public sign-up: Payload's "create first user" screen is refused, the owner is created with `npm run owner:create`
    beforeOperation: [
      ({ operation, req }) => {
        if (operation === "create" && !req.user && !req.context?.trustedSeed) {
          throw new APIError("Sign-up is disabled. Ask the site owner for an account.", 403);
        }
      },
    ],
  },
  fields: [
    { name: "name", type: "text", label: L("الاسم", "Name") },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      label: L("الصلاحية", "Role"),
      access: { create: ownerField, update: ownerField },
      options: [
        { label: L("المالك (كل الصلاحيات)", "Owner (everything)"), value: "owner" },
        { label: L("محرر (محتوى الموقع فقط)", "Editor (website content only)"), value: "editor" },
        { label: L("موظف (الإدخالات فقط)", "Staff (entries only)"), value: "staff" },
      ],
    },
  ],
};

// ---------------------------------------------------------------- media

/** Every upload field in the project points at media. Deleting a file that is still shown somewhere is refused. */
function uploadIds(fields: Field[], data: unknown, out: Set<number | string>) {
  if (!data || typeof data !== "object") return;
  const d = data as Record<string, unknown>;
  for (const f of fields) {
    if ("name" in f) {
      const v = d[f.name];
      if (f.type === "upload") [v].flat().forEach((x) => x != null && out.add(typeof x === "object" ? (x as { id: number }).id : (x as number)));
      else if (f.type === "group") uploadIds(f.fields, v, out);
      else if (f.type === "array") (Array.isArray(v) ? v : []).forEach((row) => uploadIds(f.fields, row, out));
    } else if ("fields" in f) uploadIds(f.fields, d, out); // rows, collapsibles
    else if (f.type === "tabs") f.tabs.forEach((t) => uploadIds(t.fields, "name" in t && t.name ? d[t.name] : d, out));
  }
}

export async function mediaUsage(payload: Payload, id: number | string): Promise<string[]> {
  const used: string[] = [];
  for (const g of payload.config.globals) {
    for (const draft of [false, true]) {
      const doc = await payload.findGlobal({ slug: g.slug as never, depth: 0, draft });
      const ids = new Set<number | string>();
      uploadIds(g.fields, doc, ids);
      if (ids.has(id)) {
        used.push(`global:${g.slug}`);
        break;
      }
    }
  }
  for (const c of payload.config.collections) {
    if (c.slug === "media" || !c.fields.some(function has(f): boolean {
      return f.type === "upload" || ("fields" in f && f.fields.some(has));
    })) continue;
    const { docs } = await payload.find({ collection: c.slug as never, depth: 0, limit: 0, pagination: false, draft: true });
    for (const doc of docs) {
      const ids = new Set<number | string>();
      uploadIds(c.fields, doc, ids);
      if (ids.has(id)) used.push(`${c.slug}:${(doc as { id: string }).id}`);
    }
  }
  return used;
}

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: L("صورة", "Image"), plural: L("مكتبة الصور", "Media library") },
  admin: { group: CONTENT, hidden: hiddenFromStaff, listSearchableFields: ["filename", "alt"] },
  access: { read: () => true, create: isContentTeam, update: isContentTeam, delete: isContentTeam },
  upload: {
    // No SVG: it can carry script and the files are served from the site's own origin
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"],
    focalPoint: true,
  },
  hooks: {
    beforeDelete: [
      async ({ req, id }) => {
        const used = await mediaUsage(req.payload, id);
        if (used.length) throw new APIError(`This image is still used in: ${used.join(", ")}. Replace it there first.`, 409);
      },
    ],
  },
  fields: [text("alt", { required: true, label: L("وصف الصورة (للقارئات والبحث)", "Alt text") })],
};

// ---------------------------------------------------------------- fleet

export const FleetCategories: CollectionConfig = {
  slug: "fleet-categories",
  labels: { singular: L("فئة أسطول", "Fleet category"), plural: L("فئات الأسطول", "Fleet categories") },
  orderable: true,
  admin: { useAsTitle: "title", group: CONTENT, hidden: hiddenFromStaff },
  access: { read: () => true, create: isContentTeam, update: isContentTeam, delete: isContentTeam },
  fields: [
    text("title", { required: true, label: L("الاسم", "Title") }),
    {
      name: "layout",
      type: "select",
      defaultValue: "detailed",
      label: L("طريقة العرض", "Layout"),
      options: [
        { label: L("بطاقات كبيرة مع صورة ومواصفات", "Large cards with photo and features"), value: "detailed" },
        { label: L("بطاقات صغيرة بالاسم فقط", "Small name-only cards"), value: "compact" },
      ],
    },
  ],
};

export const Amenities: CollectionConfig = {
  slug: "amenities",
  labels: { singular: L("ميزة", "Amenity"), plural: L("مزايا المركبات", "Vehicle amenities") },
  orderable: true,
  admin: { useAsTitle: "name", group: CONTENT, hidden: hiddenFromStaff },
  access: { read: () => true, create: isContentTeam, update: isContentTeam, delete: isContentTeam },
  fields: [text("name", { required: true, label: L("الاسم", "Name") }), icon()],
};

export const Vehicles = content({
  slug: "vehicles",
  labels: { singular: L("مركبة", "Vehicle"), plural: L("الأسطول", "Fleet") },
  admin: { useAsTitle: "name", defaultColumns: ["name", "category", "capacity", "_status"] },
  fields: [
    text("name", { required: true, label: L("الاسم", "Name") }),
    { name: "category", type: "relationship", relationTo: "fleet-categories", required: true, label: L("الفئة", "Category") },
    { name: "capacity", type: "number", min: 1, label: L("عدد الركاب", "Passengers") },
    image("image", { label: L("الصورة الرئيسية", "Cover photo") }),
    image("gallery", { hasMany: true, label: L("معرض الصور", "Gallery") }),
    area("description", { label: L("الوصف", "Description") }),
    { name: "amenities", type: "relationship", relationTo: "amenities", hasMany: true, label: L("المزايا", "Amenities") },
    { name: "featured", type: "checkbox", label: L("مميزة", "Featured") },
    { name: "bookable", type: "checkbox", defaultValue: true, label: L("تظهر في نموذج الحجز", "Show in booking form") },
  ],
});

// ---------------------------------------------------------------- trips

export const TripCategories: CollectionConfig = {
  slug: "trip-categories",
  labels: { singular: L("قسم رحلات", "Trip section"), plural: L("أقسام الرحلات", "Trip sections") },
  orderable: true,
  admin: { useAsTitle: "title", group: CONTENT, hidden: hiddenFromStaff },
  access: { read: () => true, create: isContentTeam, update: isContentTeam, delete: isContentTeam },
  fields: [
    text("title", { required: true, label: L("العنوان", "Title") }),
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "scheduled",
      label: L("النوع", "Kind"),
      options: [
        { label: L("رحلات بمواعيد وأسعار", "Scheduled trips with date and price"), value: "scheduled" },
        { label: L("دليل مواقع (بدون حجز)", "Destination guide (no booking)"), value: "guide" },
      ],
    },
    area("emptyHint", { label: L("نص البطاقة عند عدم وجود رحلات (سطر لكل حقل)", "Placeholder card lines when empty") }),
  ],
};

export const Trips = content({
  slug: "trips",
  labels: { singular: L("رحلة", "Trip"), plural: L("دليل الرحلات", "Trips") },
  admin: { useAsTitle: "name", defaultColumns: ["name", "category", "date", "_status"] },
  fields: [
    text("name", { required: true, label: L("الاسم", "Name") }),
    { name: "category", type: "relationship", relationTo: "trip-categories", required: true, label: L("القسم", "Section") },
    area("description", { label: L("الوصف", "Description") }),
    image("image", { label: L("الصورة", "Cover photo") }),
    image("gallery", { hasMany: true, label: L("معرض الصور", "Gallery") }),
    {
      type: "collapsible",
      label: L("الموعد والسعر (للرحلات المجدولة فقط)", "Schedule and price (scheduled trips only)"),
      fields: [
        { name: "date", type: "date", label: L("التاريخ", "Date"), admin: { date: { pickerAppearance: "dayOnly" } } },
        text("time", { label: L("الوقت", "Time") }),
        { name: "price", type: "number", min: 0, label: L("السعر", "Price") },
        {
          name: "currency",
          type: "select",
          defaultValue: "JOD",
          options: ["JOD", "USD", "SAR"].map((c) => ({ label: c, value: c })),
        },
        { name: "phone", type: "text", label: L("هاتف الحجز", "Booking phone") },
        { name: "whatsapp", type: "text", label: L("رقم واتساب", "WhatsApp number") },
        href("bookingUrl", false),
        { name: "available", type: "checkbox", defaultValue: true, label: L("متاحة للحجز", "Available") },
      ],
    },
    list("itinerary", [text("item", { required: true })], { label: L("برنامج الرحلة", "Itinerary") }),
    { name: "featured", type: "checkbox", label: L("مميزة", "Featured") },
  ],
});

// ---------------------------------------------------------------- partners & reviews

export const Partners = content({
  slug: "partners",
  labels: { singular: L("شريك", "Partner"), plural: L("الشركاء", "Partners") },
  admin: { useAsTitle: "name", defaultColumns: ["name", "logo", "showOnHome", "_status"] },
  fields: [
    text("name", { required: true, label: L("الاسم", "Name") }),
    image("logo", { label: L("الشعار (اختياري، يظهر الاسم عند عدم وجوده)", "Logo (optional)") }),
    area("details", { label: L("النص الذي يظهر عند الضغط على الشريك", "Text revealed when the partner is clicked") }),
    href("url", false),
    { name: "showOnHome", type: "checkbox", defaultValue: true, label: L("يظهر في شريط الصفحة الرئيسية", "Show on home page") },
  ],
});

export const Testimonials = content({
  slug: "testimonials",
  labels: { singular: L("رأي عميل", "Review"), plural: L("آراء العملاء", "Customer reviews") },
  admin: { useAsTitle: "name", defaultColumns: ["name", "company", "rating", "_status"] },
  fields: [
    { name: "name", type: "text", required: true, label: L("اسم العميل", "Customer name") },
    text("company", { label: L("الشركة", "Company") }),
    area("quote", { required: true, label: L("نص التقييم (يظهر عند الضغط)", "Review text (revealed on click)") }),
    { name: "rating", type: "number", min: 1, max: 5, label: L("التقييم من 5", "Rating out of 5") },
    image("photo", { label: L("صورة أو شعار", "Photo or logo") }),
    { name: "featured", type: "checkbox", label: L("مميز", "Featured") },
  ],
});

// ---------------------------------------------------------------- bookings

export const BOOKING_STATUSES = [
  { value: "new", label: L("جديد", "New") },
  { value: "review", label: L("قيد المراجعة", "Under review") },
  { value: "confirmed", label: L("مؤكد", "Confirmed") },
  { value: "completed", label: L("مكتمل", "Completed") },
  { value: "cancelled", label: L("ملغى", "Cancelled") },
  { value: "rejected", label: L("مرفوض", "Rejected") },
];

const readOnly = { readOnly: true };

export const Bookings: CollectionConfig = {
  slug: "bookings",
  labels: { singular: L("طلب حجز", "Booking request"), plural: L("طلبات الحجز", "Booking requests") },
  admin: {
    useAsTitle: "reference",
    group: OPS,
    defaultColumns: ["reference", "status", "name", "phone", "vehicleLabel", "startDate", "createdAt"],
    listSearchableFields: ["reference", "name", "phone", "email"],
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== "owner",
  },
  // Client details are confidential: owner only. Visitors create bookings through the server action, never this API.
  // readVersions must be explicit: Payload's default lets any signed-in user read the history (and its PII)
  access: { read: isOwner, readVersions: isOwner, create: () => false, update: isOwner, delete: isOwner },
  versions: { maxPerDoc: 100 },
  trash: true,
  hooks: {
    beforeChange: [
      ({ data, originalDoc, req, operation }) => {
        if (operation === "create" || data.status !== originalDoc?.status) {
          data.statusHistory = [
            ...(originalDoc?.statusHistory ?? []),
            { status: data.status ?? "new", at: new Date().toISOString(), by: req.user?.email ?? "website" },
          ];
        }
        return data;
      },
    ],
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "reference", type: "text", unique: true, index: true, required: true, label: L("رقم الطلب", "Reference"), admin: readOnly },
        {
          name: "status",
          type: "select",
          required: true,
          index: true,
          defaultValue: "new",
          label: L("الحالة", "Status"),
          options: BOOKING_STATUSES,
        },
        { name: "assignedTo", type: "relationship", relationTo: "users", label: L("المسؤول", "Assigned to") },
      ],
    },
    { name: "name", type: "text", required: true, label: L("الاسم", "Name") },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", required: true, label: L("الهاتف", "Phone") },
        { name: "email", type: "email", label: L("البريد", "Email") },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "vehicle", type: "relationship", relationTo: "vehicles", label: L("المركبة", "Vehicle") },
        { name: "vehicleLabel", type: "text", label: L("المركبة وقت الطلب", "Vehicle as requested"), admin: readOnly },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "startDate", type: "date", required: true, index: true, label: L("تاريخ البداية", "Start date"), admin: { date: { pickerAppearance: "dayOnly" } } },
        { name: "endDate", type: "date", label: L("تاريخ النهاية", "End date"), admin: { date: { pickerAppearance: "dayOnly" } } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "from", type: "text", required: true, label: L("نقطة الانطلاق", "Departure") },
        { name: "to", type: "text", required: true, label: L("نقطة الوصول", "Destination") },
      ],
    },
    { name: "message", type: "textarea", label: L("تعليق العميل", "Customer comment") },
    { name: "notes", type: "textarea", label: L("ملاحظات داخلية", "Internal notes") },
    {
      name: "statusHistory",
      type: "array",
      label: L("سجل الحالة", "Status history"),
      admin: readOnly,
      fields: [
        { name: "status", type: "select", options: BOOKING_STATUSES },
        { name: "at", type: "date", admin: { date: { pickerAppearance: "dayAndTime" } } },
        { name: "by", type: "text" },
      ],
    },
    { name: "lang", type: "select", options: ["ar", "en"], admin: readOnly },
    {
      name: "suspectedSpam",
      type: "checkbox",
      index: true,
      label: L("مشتبه بأنه رسائل مزعجة (وصل أثناء ضغط غير معتاد)", "Suspected spam (arrived during unusual volume)"),
      admin: { readOnly: true, position: "sidebar" },
    },
    { name: "ipHash", type: "text", index: true, admin: { hidden: true } },
  ],
};

// ---------------------------------------------------------------- entries

export const ENTRY_LISTS = ["movement", "type", "client", "trip", "bus", "driver", "authorization"] as const;
export type EntryList = (typeof ENTRY_LISTS)[number];

export const EntryOptions: CollectionConfig = {
  slug: "entry-options",
  labels: { singular: L("خيار إدخال", "Entry option"), plural: L("قوائم الإدخالات", "Entry lists") },
  orderable: true,
  admin: {
    useAsTitle: "label",
    group: OPS,
    defaultColumns: ["label", "list", "active"],
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== "owner",
  },
  // Owner only: client/driver/authorization lists are operational data. The entries form reads them server-side.
  access: { read: isOwner, create: isOwner, update: isOwner, delete: isOwner },
  fields: [
    {
      name: "list",
      type: "select",
      required: true,
      index: true,
      label: L("القائمة", "List"),
      options: [
        { value: "movement", label: L("الحركة", "Activity") },
        { value: "type", label: L("النوع", "Service type") },
        { value: "client", label: L("العميل", "Client") },
        { value: "trip", label: L("الرحلة", "Trip") },
        { value: "bus", label: L("رقم الحافلة", "Bus number") },
        { value: "driver", label: L("السائق", "Driver") },
        { value: "authorization", label: L("رقم التفويض", "Authorization number") },
      ],
    },
    text("label", { required: true, label: L("النص", "Label") }),
    { name: "active", type: "checkbox", defaultValue: true, label: L("فعّال", "Active") },
  ],
};

const own = ({ req }: { req: { user?: { id: number | string } | null } & Parameters<typeof isOwner>[0]["req"] }) =>
  isOwner({ req }) ? true : req.user ? { submittedBy: { equals: req.user.id } } : false;

export const Entries: CollectionConfig = {
  slug: "entries",
  labels: { singular: L("إدخال", "Entry"), plural: L("الإدخالات", "Entries") },
  admin: {
    useAsTitle: "date",
    group: OPS,
    defaultColumns: ["date", "movement", "client", "trip", "bus", "driver", "submittedBy", "createdAt"],
    listSearchableFields: ["client", "trip", "bus", "driver", "authorization", "statement"],
  },
  // Operational records: staff see what they submitted, the owner sees everything. Created only through the /entries server action.
  access: { read: own, readVersions: isOwner, create: () => false, update: isOwner, delete: isOwner },
  versions: { maxPerDoc: 50 },
  trash: true,
  fields: [
    {
      type: "row",
      fields: [
        { name: "movement", type: "text", required: true, label: L("الحركة", "Activity") },
        { name: "type", type: "text", required: true, label: L("النوع", "Service type") },
        { name: "client", type: "text", required: true, index: true, label: L("العميل", "Client") },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "trip", type: "text", required: true, label: L("الرحلة", "Trip") },
        { name: "date", type: "date", required: true, index: true, label: L("التاريخ", "Date"), admin: { date: { pickerAppearance: "dayOnly" } } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "bus", type: "text", required: true, label: L("رقم الحافلة", "Bus number") },
        { name: "driver", type: "text", required: true, label: L("السائق", "Driver") },
        { name: "authorization", type: "text", required: true, label: L("رقم التفويض", "Authorization number") },
      ],
    },
    { name: "statement", type: "textarea", label: L("بيان", "Statement") },
    { name: "submittedBy", type: "relationship", relationTo: "users", label: L("أدخله", "Submitted by"), admin: readOnly },
  ],
};

export const collections = [
  Users,
  Media,
  Vehicles,
  FleetCategories,
  Amenities,
  Trips,
  TripCategories,
  Partners,
  Testimonials,
  Bookings,
  Entries,
  EntryOptions,
];
