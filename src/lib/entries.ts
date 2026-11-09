import type { Payload } from "payload";
import { ENTRY_LISTS, type EntryList } from "@/cms/collections";

export type EntryField = EntryList | "date" | "statement";

/** Active choices per list, in the admin's order */
export async function entryOptions(payload: Payload, locale: "ar" | "en") {
  const { docs } = await payload.find({
    collection: "entry-options",
    where: { active: { equals: true } },
    sort: "_order",
    locale,
    fallbackLocale: "ar",
    limit: 1000,
    pagination: false,
    depth: 0,
  });
  return Object.fromEntries(ENTRY_LISTS.map((l) => [l, docs.filter((d) => d.list === l).map((d) => ({ id: d.id, label: d.label }))])) as Record<
    EntryList,
    { id: number; label: string }[]
  >;
}

/**
 * Validates an entry against the current active options and stores it with the Arabic label of each choice,
 * so the record stays readable if an option is renamed or deactivated later.
 */
export async function createEntry(payload: Payload, raw: Record<string, unknown>, userId: number | string) {
  const options = await entryOptions(payload, "ar");
  const bad: EntryField[] = [];
  const picked = {} as Record<EntryList, string>;
  for (const list of ENTRY_LISTS) {
    const hit = options[list].find((o) => String(o.id) === String(raw[list] ?? ""));
    if (hit) picked[list] = hit.label;
    else bad.push(list);
  }
  const date = typeof raw.date === "string" ? raw.date : "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) bad.push("date");
  const statement = typeof raw.statement === "string" ? raw.statement.trim() : "";
  if (statement.length > 2000) bad.push("statement");
  if (bad.length) return { ok: false as const, fields: bad };

  const doc = await payload.create({
    collection: "entries",
    data: { ...picked, date, statement: statement || undefined, submittedBy: userId as number },
    overrideAccess: true,
  });
  return { ok: true as const, id: doc.id };
}
