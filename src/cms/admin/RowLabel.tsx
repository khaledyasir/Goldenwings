"use client";

import { useRowLabel, useTranslation } from "@payloadcms/ui";

const KEYS = ["label", "title", "name", "text", "item"] as const;

/** Titles each row of a list by its own content ("الرئيسية", "Modern Buses") instead of "Nav 01" */
export function RowLabel() {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>();
  const { i18n } = useTranslation();
  const text = KEYS.map((k) => data?.[k]).find((v): v is string => typeof v === "string" && v.trim() !== "");
  const n = String((rowNumber ?? 0) + 1).padStart(2, "0");
  const fallback = i18n.language === "en" ? "New item" : "عنصر جديد";
  const value = text ? text.replace(/[[\]]/g, "") : fallback;
  return (
    <span className="gw-row-label">
      <span className="gw-row-label__n">{n}</span>
      {value.length > 70 ? `${value.slice(0, 70)}…` : value}
    </span>
  );
}
