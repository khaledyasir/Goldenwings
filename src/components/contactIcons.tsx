import { Mail, Phone, MessageCircle } from "lucide-react";
import { contactLinks } from "@/lib/cms";
import type { Setting } from "@/payload-types";

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

/** Gold, clickable icons in the order given in the content document. Social links without a URL are left out. */
export function contactIcons(s: Setting) {
  const links = contactLinks(s);
  const l = s.labels ?? {};
  return [
    { key: "call", label: l.call ?? "", href: links.tel, icon: Phone, external: false },
    { key: "whatsapp", label: l.whatsapp ?? "", href: links.whatsapp, icon: MessageCircle, external: true },
    { key: "email", label: l.email ?? "", href: links.mail, icon: Mail, external: false },
    { key: "facebook", label: l.facebook ?? "", href: s.facebookUrl ?? "", icon: FacebookIcon, external: true },
    { key: "instagram", label: l.instagram ?? "", href: s.instagramUrl ?? "", icon: InstagramIcon, external: true },
  ].filter((c) => c.href);
}
