import { Phone, MessageCircle } from "lucide-react";
import { FACEBOOK_LINK, INSTAGRAM_LINK, PHONE_TEL, WHATSAPP_LINK } from "@/lib/constants";

// lucide-react v1 dropped brand icons, so Instagram/Facebook are inline SVGs
export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/** Gold, clickable icons in the order given in the content document */
export const CONTACT_ICONS = [
  { label: "اتصال", href: PHONE_TEL, icon: Phone, external: false },
  { label: "واتساب", href: WHATSAPP_LINK, icon: MessageCircle, external: true },
  { label: "فيسبوك", href: FACEBOOK_LINK, icon: FacebookIcon, external: true },
  { label: "انستا", href: INSTAGRAM_LINK, icon: InstagramIcon, external: true },
];

export default function SocialSidebar() {
  return (
    <nav
      aria-label="تواصل معنا"
      // Phones: bottom bar so it never covers content. md+: right-edge rail, vertically centred (the document asks for the right of the page).
      className="fixed z-40 flex overflow-hidden bg-navy shadow-lg max-md:inset-x-0 max-md:bottom-0 max-md:border-t max-md:border-gold/40 md:right-0 md:top-1/2 md:-translate-y-1/2 md:flex-col md:rounded-l-xl"
    >
      {CONTACT_ICONS.map(({ label, href, icon: Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex items-center justify-center text-gold transition hover:bg-gold hover:text-navy max-md:h-14 max-md:flex-1 max-md:flex-col max-md:gap-0.5 md:h-12 md:w-12"
        >
          <Icon className="h-6 w-6" />
          <span className="text-[11px] font-semibold text-white md:hidden">{label}</span>
        </a>
      ))}
    </nav>
  );
}
