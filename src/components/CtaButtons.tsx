import Link from "next/link";
import { ChevronLeft, Phone } from "lucide-react";
import { BOOKING_HREF, PHONE_TEL } from "@/lib/constants";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

export default async function CtaButtons({ dark = false, bookLabel }: { dark?: boolean; bookLabel?: string }) {
  const lang = await getLang();
  return (
    <div className="flex flex-wrap items-center gap-4 max-sm:w-full max-sm:flex-col max-sm:items-stretch max-sm:gap-3">
      <a
        href={PHONE_TEL}
        className={`inline-flex items-center justify-center gap-3 rounded-md px-7 py-3.5 text-base font-bold shadow-md transition ${
          dark
            ? "bg-white text-navy hover:bg-gold-light"
            : "bg-navy text-white hover:bg-navy-light"
        }`}
      >
        <Phone className="h-5 w-5 text-gold" />
        {t(lang, "اتصال", "Call")}
      </a>
      <Link
        href={BOOKING_HREF}
        className="inline-flex items-center justify-center gap-3 rounded-md bg-gold px-7 py-3.5 text-base font-bold text-navy shadow-md transition hover:bg-gold-light"
      >
        {bookLabel ?? t(lang, "احجز الآن", "Book Now")}
        <ChevronLeft className="h-5 w-5 ltr:rotate-180" />
      </Link>
    </div>
  );
}
