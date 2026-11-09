import type { Media } from "@/payload-types";

/**
 * Normalizes an upload field (populated at depth 1) for next/image. Locally stored files come back as absolute
 * URLs on this site; they are made relative so next/image treats them as local. Blob URLs are left as they are.
 */
export function media(m: number | Media | null | undefined) {
  if (!m || typeof m !== "object" || !m.url) return null;
  const src = m.url.replace(/^https?:\/\/[^/]+(?=\/api\/media\/)/, "");
  return { src, alt: m.alt ?? "", width: m.width ?? 1600, height: m.height ?? 900 };
}
