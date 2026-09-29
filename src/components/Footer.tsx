import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/SocialSidebar";
import {
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  MAPS_LINK,
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_LINK,
} from "@/lib/constants";

const SERVICE_LINKS = NAV_LINKS.find((l) => l.children)?.children ?? [];

function Heading({ children }: { children: string }) {
  return (
    <div className="mb-5">
      <h3 className="text-base font-bold text-white">{children}</h3>
      <div className="mt-2 h-0.5 w-10 rounded-full bg-gold" />
    </div>
  );
}

const SOCIALS = [
  { label: "انستجرام", href: INSTAGRAM_LINK, icon: InstagramIcon },
  { label: "فيسبوك", href: FACEBOOK_LINK, icon: FacebookIcon },
  { label: "واتساب", href: WHATSAPP_LINK, icon: MessageCircle },
];

const linkClass = "text-sm text-white/70 transition hover:text-gold";

function ContactRow({
  icon: Icon,
  children,
  href,
  external,
}: {
  icon: typeof Phone;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <span>{children}</span>
    </>
  );
  const cls = "flex items-center gap-3 text-sm text-white/80";
  return href ? (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${cls} transition hover:text-gold`}
    >
      {content}
    </a>
  ) : (
    <div className={cls}>{content}</div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-gold bg-navy text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-14 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr] lg:gap-x-12 lg:px-8">
        {/* lg:order-last puts the brand column on the left under RTL */}
        <div className="col-span-2 lg:order-last lg:col-span-1">
          <Image
            src="/logo-transparent.png"
            alt="الأجنحة الذهبية لخدمة النقل"
            width={114}
            height={64}
            className="h-16 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-loose text-white/70">
            الأجنحة الذهبية لتأجير الحافلات الأردنية، شريككم الموثوق في النقل.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-navy"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="روابط سريعة" className="col-span-2 lg:col-span-1">
          <Heading>روابط سريعة</Heading>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="خدماتنا" className="col-span-2 sm:col-span-1">
          <Heading>خدماتنا</Heading>
          <ul className="space-y-3">
            {SERVICE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 sm:col-span-1">
          <Heading>تواصل معنا</Heading>
          <div className="space-y-4">
            <ContactRow icon={Phone} href={PHONE_TEL}>
              <span dir="ltr">{PHONE_DISPLAY}</span>
            </ContactRow>
            <ContactRow icon={MessageCircle} href={WHATSAPP_LINK} external>
              تواصل عبر واتساب
            </ContactRow>
            <ContactRow icon={MapPin} href={MAPS_LINK} external>
              عمّان، الأردن (عرض الموقع على الخريطة)
            </ContactRow>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} الأجنحة الذهبية لخدمة النقل وتأجير الحافلات الأردنية. جميع
        الحقوق محفوظة.
      </div>
    </footer>
  );
}
