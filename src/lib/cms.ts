import { cache, type ReactNode } from "react";
import { cookies, headers } from "next/headers";
import { getPayload, type CollectionSlug, type GlobalSlug, type Where } from "payload";
import config from "@payload-config";
import type { Setting } from "@/payload-types";
export { media } from "@/lib/media";
import { getLang } from "@/lib/getLang";

/** Payload's local API: server-only, no HTTP round trip */
export const cms = cache(() => getPayload({ config }));

/** The logged-in admin user, if any. Verified from the auth cookie on every request. */
export const getViewer = cache(async () => {
  const { user } = await (await cms()).auth({ headers: await headers() });
  return user as (typeof user & { role?: "owner" | "editor" | "staff" }) | null;
});

export const EDIT_COOKIE = "gw-edit";

/**
 * Visual edit mode: the cookie is only a preference set by an authenticated route; editing (and draft content)
 * also requires a valid owner/editor session checked here, so neither a URL flag nor a copied cookie unlocks it.
 */
export const isEditing = cache(async () => {
  if ((await cookies()).get(EDIT_COOKIE)?.value !== "1") return false;
  const user = await getViewer();
  return user?.role === "owner" || user?.role === "editor";
});

/** A page or settings global in the visitor's language. Drafts only for an editor in edit mode. */
export const getGlobal = cache(async <S extends GlobalSlug>(slug: S) => {
  const [payload, lang, draft] = await Promise.all([cms(), getLang(), isEditing()]);
  return payload.findGlobal({ slug, locale: lang, fallbackLocale: "ar", draft, depth: 1 });
});

export const getSettings = () => getGlobal("settings") as Promise<Setting>;

/** generateMetadata for a page global's SEO group; falls back to the site defaults from the layout */
export async function pageMeta(slug: GlobalSlug) {
  const { seo } = (await getGlobal(slug)) as { seo?: { title?: string | null; description?: string | null } };
  // Only set keys that have a value: an explicit undefined would wipe the layout's default description
  return { ...(seo?.title && { title: seo.title }), ...(seo?.description && { description: seo.description }) };
}

/** Published documents in display order; an editor in edit mode also sees drafts */
export async function listDocs<C extends CollectionSlug>(collection: C, where?: Where) {
  const [payload, lang, editing] = await Promise.all([cms(), getLang(), isEditing()]);
  const hasDrafts = Boolean(payload.collections[collection].config.versions?.drafts);
  const draft = editing && hasDrafts;
  const { docs } = await payload.find({
    collection,
    locale: lang,
    fallbackLocale: "ar",
    draft,
    depth: 1,
    limit: 500,
    pagination: false,
    sort: "_order",
    where: draft || !hasDrafts ? where : { and: [{ _status: { equals: "published" } }, ...(where ? [where] : [])] },
  });
  return docs;
}

type EditAttrs = { "data-cms"?: string; "data-cms-doc"?: string };

/**
 * Marks an element as editable in visual edit mode. `path` is the stable field path inside the global,
 * e.g. "hero.title" or "features.2.text". Renders nothing for normal visitors.
 */
export async function editable(slug: GlobalSlug) {
  const on = await isEditing();
  return (path: string, kind: "text" | "image" = "text"): EditAttrs => (on ? { "data-cms": `${slug}|${path}|${kind}` } : {});
}

/** Marks a repeated item (vehicle, partner, trip, review) so a click opens its editor in the admin */
export async function editableDoc() {
  const on = await isEditing();
  return (collection: CollectionSlug, id: number | string): EditAttrs => (on ? { "data-cms-doc": `${collection}/${id}` } : {});
}

/** Renders `[word]` segments with the given wrapper, the rest as plain text. Never parses HTML. */
export function marked(textValue: string | null | undefined, wrap: (s: string, i: number) => ReactNode): ReactNode[] {
  return (textValue ?? "").split(/\[([^\]]+)\]/).map((part, i) => (i % 2 ? wrap(part, i) : part));
}

export function contactLinks(s: Setting) {
  const q = encodeURIComponent(s.mapsQuery ?? s.companyName ?? "");
  return {
    tel: `tel:${s.phoneIntl}`,
    whatsapp: `https://wa.me/${s.whatsapp}`,
    mail: `mailto:${s.email}`,
    maps: s.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${q}`,
    mapsEmbed: (lang: string) => `https://www.google.com/maps?q=${q}&hl=${lang}&output=embed`,
  };
}
