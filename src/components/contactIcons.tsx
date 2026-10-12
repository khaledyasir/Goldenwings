import { Mail, Phone, MessageCircle } from "lucide-react";
import { EMAIL, FACEBOOK_LINK, INSTAGRAM_LINK, PHONE_TEL, WHATSAPP_LINK } from "@/lib/constants";

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
  { label: "البريد", href: `mailto:${EMAIL}`, icon: Mail, external: false },
  { label: "فيسبوك", href: FACEBOOK_LINK, icon: FacebookIcon, external: true },
  { label: "انستا", href: INSTAGRAM_LINK, icon: InstagramIcon, external: true },
];
