export type Lang = "ar" | "en";
/** A string in both languages, picked with `b[lang]` */
export type Bi = { ar: string; en: string };

/** Pick per language for an inline pair: t(lang, "عربي", "English") */
export const t = <T,>(lang: Lang, ar: T, en: T): T => (lang === "en" ? en : ar);
