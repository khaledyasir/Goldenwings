import type { ArrayField, Field, GroupField, TextField, TextareaField, UploadField } from "payload";
import { ICON_NAMES } from "../lib/icons";

/** Localized one-line text (Arabic + English) */
export const text = (name: string, extra: Partial<TextField> = {}): TextField =>
  ({ name, type: "text", localized: true, ...extra }) as TextField;

/** Localized multi-line text. Rendered as plain text, never HTML. `[word]` renders highlighted in gold where noted. */
export const area = (name: string, extra: Partial<TextareaField> = {}): TextareaField =>
  ({ name, type: "textarea", localized: true, ...extra }) as TextareaField;

export const image = (name: string, extra: Partial<UploadField> = {}): UploadField =>
  ({ name, type: "upload", relationTo: "media", ...extra }) as UploadField;

export const icon = (name = "icon"): Field => ({
  name,
  type: "select",
  options: ICON_NAMES.map((n) => ({ label: n, value: n })),
});

export const list = (name: string, fields: Field[], extra: Partial<ArrayField> = {}): ArrayField =>
  ({ name, type: "array", fields, ...extra }) as ArrayField;

export const group = (name: string, fields: Field[], label?: string): GroupField => ({
  name,
  type: "group",
  label,
  fields,
});

/** Page title / description for search engines */
export const seo = (): GroupField =>
  group("seo", [text("title"), area("description")], "SEO");

/** Site path (not `//host` or `/\host`, which browsers treat as another site), http(s), tel: or mailto: */
export const HREF = /^(\/(?![/\\])\S*|https?:\/\/\S+|tel:\S+|mailto:\S+)$/;

/** A link target: a site path such as /fleet or a full https URL */
export const href = (name = "href", required = true): TextField => ({
  name,
  type: "text",
  required,
  validate: (v: unknown) =>
    !v && !required ? true : typeof v === "string" && HREF.test(v)
      ? true
      : "Use a path like /fleet or a full https:// link",
});
