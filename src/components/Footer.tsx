import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { CONTACT_ICONS } from "@/components/SocialSidebar";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL, SERVICE_LINKS } from "@/lib/constants";

const QUICK_LINKS = NAV_LINKS.filter((l) => !l.children);

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-base font-bold text-white">{title}</h3>
      <div className="mb-5 mt-2 h-0.5 w-10 rounded-full bg-gold" />
      {children}
    </div>
  );
}

function LinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className="text-sm text-white/75 transition hover:text-gold">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="relative mt-auto scroll-mt-20 bg-navy text-white">
      {/* Wavy top edge with a fine gold line along it, so the footer rises out of the page instead of starting on a hard straight cut. Same navy as the map panel, so it disappears when that sits above. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-full h-8 w-full lg:h-12"
      >
        <path d="M0 48V26C240 2 480 2 720 26S1200 50 1440 26V48Z" className="fill-navy" />
        <path
          d="M0 26C240 2 480 2 720 26S1200 50 1440 26"
          className="fill-none stroke-gold/60"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Four even columns: quick links, services, contact, brand (logo ends up on the left under RTL) */}
      <div className="relative mx-auto grid max-w-7xl gap-x-10 gap-y-10 px-4 pb-14 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <Column title="روابط سريعة">
          <LinkList links={QUICK_LINKS} />
        </Column>

        <Column title="خدماتنا">
          <LinkList links={SERVICE_LINKS} />
        </Column>

        <Column title="تواصل معنا">
          <a
            href={PHONE_TEL}
            dir="ltr"
            className="mb-5 flex w-fit items-center gap-3 rounded-md border border-gold px-5 py-2.5 text-lg font-bold transition hover:bg-gold hover:text-navy"
          >
            <Phone className="h-5 w-5 text-gold" />
            {PHONE_DISPLAY}
          </a>
          <div className="flex flex-wrap gap-3">
            {CONTACT_ICONS.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold transition hover:bg-gold hover:text-navy"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Column>

        <div className="flex items-start sm:col-span-2 lg:col-span-1 lg:justify-end">
          <Image
            src="/logo-transparent.png"
            alt="الأجنحة الذهبية لخدمة النقل"
            width={114}
            height={64}
            className="h-20 w-auto"
          />
        </div>
      </div>
    </footer>
  );
}
