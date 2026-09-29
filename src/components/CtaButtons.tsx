import Link from "next/link";
import { ChevronLeft, Phone } from "lucide-react";
import { BOOKING_HREF, PHONE_TEL } from "@/lib/constants";

export default function CtaButtons({
  dark = false,
  callLabel = "تواصل معنا",
}: {
  dark?: boolean;
  callLabel?: string;
}) {
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
        {callLabel}
      </a>
      <Link
        href={BOOKING_HREF}
        className="inline-flex items-center justify-center gap-3 rounded-md bg-gold px-7 py-3.5 text-base font-bold text-navy shadow-md transition hover:bg-gold-light"
      >
        اطلب عرض السعر
        <ChevronLeft className="h-5 w-5" />
      </Link>
    </div>
  );
}
