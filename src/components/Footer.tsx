import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { contactIcons } from "@/components/contactIcons";
import { editable, getSettings, media } from "@/lib/cms";

function Column({ title, children, edit }: { title: string; children: React.ReactNode; edit: object }) {
  return (
    <div>
      <h3 className="text-base font-bold text-white" {...edit}>
        {title}
      </h3>
      <div className="mb-5 mt-2 h-0.5 w-10 rounded-full bg-gold" />
      {children}
    </div>
  );
}

export default async function Footer() {
  const [s, ed] = await Promise.all([getSettings(), editable("settings")]);
  const logo = media(s.logo);
  const l = s.labels ?? {};
  return (
    <footer id="contact" className="relative mt-auto scroll-mt-20 bg-navy text-white">
      {/* Three even columns: services + book link, contact, brand (logo ends up on the left under RTL) */}
      <div className="relative mx-auto grid max-w-7xl gap-x-10 gap-y-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <Column title={l.ourServices ?? ""} edit={ed("labels.ourServices")}>
          <ul className="space-y-3">
            {(s.footerLinks ?? []).map((link, i) => (
              <li key={link.id ?? link.href}>
                <Link href={link.href} className="text-sm text-white/75 transition hover:text-gold" {...ed(`footerLinks.${i}.label`)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Column>

        <Column title={l.contactUs ?? ""} edit={ed("labels.contactUs")}>
          <a
            href={`tel:${s.phoneIntl}`}
            dir="ltr"
            className="mb-5 flex w-fit items-center gap-3 rounded-md border border-gold px-5 py-2.5 text-lg font-bold transition hover:bg-gold hover:text-navy"
          >
            <Phone className="h-5 w-5 text-gold" />
            <span {...ed("phoneDisplay")}>{s.phoneDisplay}</span>
          </a>
          <a href={`mailto:${s.email}`} dir="ltr" className="mb-5 block w-fit text-sm text-white/75 transition hover:text-gold" {...ed("email")}>
            {s.email}
          </a>
          <div className="flex flex-wrap gap-3">
            {contactIcons(s).map(({ key, label, href, icon: Icon, external }) => (
              <a
                key={key}
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

        <div className="flex items-start sm:col-span-2 lg:col-span-1 lg:justify-end" {...ed("logo", "image")}>
          {logo && <Image src={logo.src} alt={s.companyName} width={logo.width} height={logo.height} className="h-20 w-auto" />}
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-sm text-white/75">
        <p {...ed("labels.copyright")}>{(l.copyright ?? "").replace("{year}", String(new Date().getFullYear()))}</p>
        <a href="https://www.tenderjo.com/" target="_blank" rel="noopener noreferrer" aria-label="TenderJo" className="mt-4 inline-block">
          <Image src="/tenderjo-logo.png" alt="TenderJo" width={120} height={34} className="h-8 w-auto" />
        </a>
      </div>
    </footer>
  );
}
