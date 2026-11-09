"use client";

import dynamic from "next/dynamic";
import type { Lang } from "@/lib/i18n";

// Code-split: the editor's chunk is only fetched when this renders, i.e. for a signed-in editor in edit mode
const VisualEditor = dynamic(() => import("./VisualEditor"), { ssr: false });

export default function EditorLoader({ lang }: { lang: Lang }) {
  return <VisualEditor lang={lang} />;
}
