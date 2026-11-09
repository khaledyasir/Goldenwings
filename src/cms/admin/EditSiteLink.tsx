"use client";

import Link from "next/link";
import { useAuth, useTranslation } from "@payloadcms/ui";

/** Shortcuts at the top of the side menu, so the common tasks never need hunting for */
export function EditSiteLink() {
  const { i18n } = useTranslation();
  const { user } = useAuth<{ role?: string }>();
  const ar = i18n.language !== "en";
  const role = user?.role;
  return (
    <div className="gw-quick">
      {/* Full navigations on purpose: the edit route sets a cookie and redirects */}
      {role !== "staff" && (
        // eslint-disable-next-line @next/next/no-html-link-for-pages
        <a className="gw-quick__primary" href="/api/edit-mode?path=/">
          ✎ {ar ? "تعديل الموقع" : "Edit website"}
        </a>
      )}
      <Link className="gw-quick__link" href="/admin">
        {ar ? "الرئيسية" : "Home"}
      </Link>
      {role === "owner" && (
        <Link className="gw-quick__link" href="/admin/collections/bookings?where[status][equals]=new">
          {ar ? "طلبات الحجز الجديدة" : "New booking requests"}
        </Link>
      )}
      {role === "staff" && (
        <Link className="gw-quick__link" href="/entries">
          {ar ? "إدخال جديد" : "New entry"}
        </Link>
      )}
    </div>
  );
}
