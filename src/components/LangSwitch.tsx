"use client";

import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import type { Lang } from "@/lib/i18n";

/** Sets the lang cookie and re-renders the server components in the other language */
export default function LangSwitch({ lang, className = "" }: { lang: Lang; className?: string }) {
  const router = useRouter();
  const next: Lang = lang === "en" ? "ar" : "en";
  return (
    <button
      type="button"
      onClick={() => {
        document.cookie = `lang=${next};path=/;max-age=31536000;samesite=lax`;
        router.refresh();
      }}
      aria-label={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
      className={`flex shrink-0 items-center gap-1.5 rounded-md border border-gold px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-gold hover:text-navy ${className}`}
    >
      <Languages className="h-4 w-4 text-gold" />
      {lang === "en" ? "عربي" : "EN"}
    </button>
  );
}
