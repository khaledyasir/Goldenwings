import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { CONTACT_ICONS } from "@/components/contactIcons";
import { BOOKING_HREF, COMPANY, EMAIL, PHONE_DISPLAY, PHONE_TEL, SERVICE_LINKS } from "@/lib/constants";
import { getLang } from "@/lib/getLang";
import { t, type Bi, type Lang } from "@/lib/i18n";

const FOOTER_LINKS = [...SERVICE_LINKS, { label: { ar: "احجز الآن", en: "Book Now" }, href: BOOKING_HREF }];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-base font-bold text-white">{title}</h3>
      <div className="mb-5 mt-2 h-0.5 w-10 rounded-full bg-gold" />
      {children}
    </div>
  );
}

function LinkList({ links, lang }: { links: { label: Bi; href: string }[]; lang: Lang }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-sm text-white/75 transition hover:text-gold">
            {link.label[lang]}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function Footer() {
  const lang = await getLang();
  return (
    <footer id="contact" className="relative mt-auto scroll-mt-20 bg-navy text-white">
      {/* Three even columns: services + book link, contact, brand (logo ends up on the left under RTL) */}
      <div className="relative mx-auto grid max-w-7xl gap-x-10 gap-y-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <Column title={t(lang, "خدماتنا", "Our Services")}>
          <LinkList links={FOOTER_LINKS} lang={lang} />
        </Column>

        <Column title={t(lang, "تواصل معنا", "Contact Us")}>
          <a
            href={PHONE_TEL}
            dir="ltr"
            className="mb-5 flex w-fit items-center gap-3 rounded-md border border-gold px-5 py-2.5 text-lg font-bold transition hover:bg-gold hover:text-navy"
          >
            <Phone className="h-5 w-5 text-gold" />
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} dir="ltr" className="mb-5 block w-fit text-sm text-white/75 transition hover:text-gold">
            {EMAIL}
          </a>
          <div className="flex flex-wrap gap-3">
            {CONTACT_ICONS.map(({ label: bi, href, icon: Icon, external }) => {
              const label = bi[lang];
              return (
              <a
                key={bi.en}
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold transition hover:bg-gold hover:text-navy"
              >
                <Icon className="h-5 w-5" />
              </a>
              );
            })}
          </div>
        </Column>

        <div className="flex items-start sm:col-span-2 lg:col-span-1 lg:justify-end">
          <Image
            src="/logo-v3.png"
            alt={COMPANY[lang]}
            width={1212}
            height={573}
            className="h-20 w-auto"
          />
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-sm text-white/75">
        <p>
          {t(
            lang,
            `حقوق الطبع والنشر © ${new Date().getFullYear()} الأجنحة الذهبية لخدمة النقل وتاجير الحافلات. جميع الحقوق محفوظة.`,
            `Copyright © ${new Date().getFullYear()} ${COMPANY.en}. All rights reserved.`,
          )}
        </p>
        <a
          href="https://www.tenderjo.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TenderJo"
          className="mt-4 inline-block"
        >
          <Image src="/tenderjo-logo.png" alt="TenderJo" width={120} height={34} className="h-8 w-auto" />
        </a>
      </div>
    </footer>
  );
}
