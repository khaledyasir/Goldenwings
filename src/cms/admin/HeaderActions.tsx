"use client";

import { useTheme, useTranslation } from "@payloadcms/ui";
import { useState } from "react";

const sun = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);
const moon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);
const globe = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
  </svg>
);
const eye = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/**
 * Top-bar buttons: view the public site, switch admin language (Arabic puts the menu on the right, English on
 * the left), switch light/dark mode. Both preferences are remembered by Payload for this user/browser.
 */
export function HeaderActions() {
  const { theme, setTheme } = useTheme();
  const { i18n, switchLanguage } = useTranslation();
  const [busy, setBusy] = useState(false);
  const ar = i18n.language !== "en";

  return (
    <div className="gw-actions">
      <a className="gw-action" href="/" target="_blank" rel="noopener noreferrer" title={ar ? "عرض الموقع" : "View website"}>
        {eye}
        <span>{ar ? "عرض الموقع" : "View site"}</span>
      </a>
      <button
        type="button"
        className="gw-action"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          await switchLanguage?.(ar ? "en" : "ar");
          setBusy(false);
        }}
        title={ar ? "Switch to English" : "التبديل إلى العربية"}
      >
        {globe}
        <span>{ar ? "English" : "العربية"}</span>
      </button>
      <button
        type="button"
        className="gw-action gw-action--icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={theme === "dark" ? (ar ? "الوضع الفاتح" : "Light mode") : ar ? "الوضع الداكن" : "Dark mode"}
        title={theme === "dark" ? (ar ? "الوضع الفاتح" : "Light mode") : ar ? "الوضع الداكن" : "Dark mode"}
      >
        {theme === "dark" ? sun : moon}
      </button>
    </div>
  );
}
