/**
 * Imports the pre-CMS website content into the database.
 *
 * Idempotent and non-destructive: a global is only filled while it has never been saved, and a collection item is
 * only created when no item with the same Arabic name exists. Re-running never overwrites an editor's changes.
 *
 *   npm run seed
 */
import path from "node:path";
import type { GlobalSlug, Payload } from "payload";
import { AMENITIES, ENTRY_OPTIONS, FLEET_CATEGORIES, FLEET_IMAGE, GLOBALS, PARTNERS, TRIP_CATEGORIES, type SeedImage } from "./content";

type Bi = { ar: string; en: string };
const isBi = (v: unknown): v is Bi =>
  !!v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).sort().join() === "ar,en";
const isImg = (v: unknown): v is SeedImage => !!v && typeof v === "object" && "__media" in v;

const ctx = { trustedSeed: true, disableRevalidate: true };

export async function seed(payload: Payload, log = console.log) {
  const mediaIds = new Map<string, number>();

  async function mediaId(m: SeedImage) {
    const filename = path.basename(m.__media);
    if (mediaIds.has(filename)) return mediaIds.get(filename)!;
    const found = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1, depth: 0 });
    let id = found.docs[0]?.id as number | undefined;
    if (!id) {
      const doc = await payload.create({
        collection: "media",
        locale: "ar",
        data: { alt: m.alt.ar },
        filePath: path.resolve(process.cwd(), m.__media),
        context: ctx,
      });
      id = doc.id as number;
      await payload.update({ collection: "media", id, locale: "en", data: { alt: m.alt.en }, context: ctx });
      log(`  media: ${filename}`);
    }
    mediaIds.set(filename, id);
    return id;
  }

  /** Resolves images and picks one language. For English, array rows reuse the ids created with the Arabic pass. */
  async function localize(v: unknown, lang: "ar" | "en", existing?: unknown): Promise<unknown> {
    if (isImg(v)) return mediaId(v);
    if (isBi(v)) return v[lang];
    if (Array.isArray(v)) {
      const rows = Array.isArray(existing) ? existing : [];
      return Promise.all(
        v.map(async (row, i) => {
          const out = (await localize(row, lang, rows[i])) as Record<string, unknown>;
          return rows[i]?.id && out && typeof out === "object" ? { ...out, id: rows[i].id } : out;
        }),
      );
    }
    if (v && typeof v === "object") {
      const ex = (existing ?? {}) as Record<string, unknown>;
      const out: Record<string, unknown> = {};
      for (const [k, val] of Object.entries(v)) out[k] = await localize(val, lang, ex[k]);
      return out;
    }
    return v;
  }

  // ---- globals: only while never saved
  for (const [slug, data] of Object.entries(GLOBALS)) {
    const s = slug as GlobalSlug;
    const versions = await payload.findGlobalVersions({ slug: s, limit: 1, depth: 0 });
    const current = (await payload.findGlobal({ slug: s, depth: 0, draft: true })) as { updatedAt?: string };
    if (versions.totalDocs > 0 || current.updatedAt) {
      log(`  global ${slug}: already has content, skipped`);
      continue;
    }
    const arDoc = await payload.updateGlobal({
      slug: s,
      locale: "ar",
      data: { ...((await localize(data, "ar")) as object), _status: "published" } as never,
      depth: 0,
      context: ctx,
    });
    await payload.updateGlobal({
      slug: s,
      locale: "en",
      data: { ...((await localize(data, "en", arDoc)) as object), _status: "published" } as never,
      depth: 0,
      context: ctx,
    });
    log(`  global ${slug}: seeded`);
  }

  /** Creates a bilingual document unless one with the same Arabic `key` field already exists */
  async function upsertNew(collection: string, key: string, data: Record<string, unknown>) {
    // Loosely typed on purpose: one helper for several collections
    const c = collection as "partners";
    const found = await payload.find({
      collection: c,
      where: { [key]: { equals: (data[key] as Bi).ar } },
      locale: "ar",
      limit: 1,
      depth: 0,
      draft: true,
      trash: true,
    });
    if (found.docs[0]) return found.docs[0].id;
    const doc = await payload.create({ collection: c, locale: "ar", data: (await localize(data, "ar")) as never, depth: 0, context: ctx, draft: false });
    await payload.update({ collection: c, id: doc.id, locale: "en", data: (await localize(data, "en", doc)) as never, depth: 0, context: ctx });
    log(`  ${collection}: ${(data[key] as Bi).ar}`);
    return doc.id;
  }

  const amenityIds: number[] = [];
  for (const [iconName, name] of AMENITIES) amenityIds.push(await upsertNew("amenities", "name", { name, icon: iconName }));

  for (const cat of FLEET_CATEGORIES) {
    const category = await upsertNew("fleet-categories", "title", { title: cat.title, layout: cat.layout });
    for (const [capacity, name] of cat.vehicles) {
      const detailed = cat.layout === "detailed";
      await upsertNew("vehicles", "name", {
        name,
        category,
        capacity,
        image: detailed ? FLEET_IMAGE : undefined,
        amenities: detailed ? amenityIds : [],
        bookable: true,
        _status: "published",
      });
    }
  }

  for (const cat of TRIP_CATEGORIES) await upsertNew("trip-categories", "title", cat);

  for (const p of PARTNERS) await upsertNew("partners", "name", { ...p, showOnHome: true, _status: "published" });

  for (const [list, options] of Object.entries(ENTRY_OPTIONS)) {
    for (const label of options) {
      const found = await payload.find({
        collection: "entry-options",
        where: { and: [{ list: { equals: list } }, { label: { equals: label.ar } }] },
        locale: "ar",
        limit: 1,
        depth: 0,
      });
      if (found.docs[0]) continue;
      const doc = await payload.create({ collection: "entry-options", locale: "ar", data: { list: list as never, label: label.ar }, context: ctx });
      await payload.update({ collection: "entry-options", id: doc.id, locale: "en", data: { label: label.en }, context: ctx });
    }
  }
  log("Seed complete.");
}
