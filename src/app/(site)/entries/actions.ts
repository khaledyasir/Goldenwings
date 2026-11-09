"use server";

import { cms, getViewer } from "@/lib/cms";
import { createEntry, type EntryField } from "@/lib/entries";

export type EntryState = { status: "idle" } | { status: "ok" } | { status: "error"; fields: EntryField[] };

export async function submitEntry(_prev: EntryState, form: FormData): Promise<EntryState> {
  // Operational records: only signed-in staff may submit, checked here and not only by hiding the page
  const user = await getViewer();
  if (!user) return { status: "error", fields: [] };
  try {
    const r = await createEntry(await cms(), Object.fromEntries(form), user.id);
    return r.ok ? { status: "ok" } : { status: "error", fields: r.fields };
  } catch (e) {
    console.error("Entry failed", e);
    return { status: "error", fields: [] };
  }
}
