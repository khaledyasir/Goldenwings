import { cookies } from "next/headers";
import type { Lang } from "@/lib/i18n";

/** The language is a cookie set by the switch button, Arabic by default. Reading it makes pages dynamic, fine for this site. */
export async function getLang(): Promise<Lang> {
  return (await cookies()).get("lang")?.value === "en" ? "en" : "ar";
}
