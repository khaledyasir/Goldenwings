"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import LangSwitch from "@/components/LangSwitch";
import { iconFor } from "@/lib/icons";
import type { Lang } from "@/lib/i18n";
import { media } from "@/lib/media";
import type { Setting } from "@/payload-types";

type NavLink = NonNullable<Setting["nav"]>[number];

function isActive(link: NavLink, pathname: string) {
  return link.href === pathname || !!link.children?.some((c) => c.href === pathname);
}

export default function Navbar({ lang, settings: s, editing }: { lang: Lang; settings: Setting; editing: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const nav = s.nav ?? [];
  const logo = media(s.logo);
  // Visual edit markers, only in the editor's own session
  const ed = (path: string, kind: "text" | "image" = "text") => (editing ? { "data-cms": `settings|${path}|${kind}` } : {});

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-md">
      {/* Logo on the left, phone on the right in both languages (row-reverse under RTL) */}
      <div className="mx-auto flex max-w-7xl rtl:flex-row-reverse items-center justify-between gap-4 px-4 py-3 xl:px-8">
        <Link href="/" className="flex shrink-0 items-center" {...ed("logo", "image")}>
          {logo && (
            <Image
              src={logo.src}
              alt={s.companyName}
              width={logo.width}
              height={logo.height}
              className="h-14 w-auto xl:h-[72px]"
              priority
            />
          )}
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {nav.map((link, i) => {
            const active = isActive(link, pathname);
            return (
              <div key={link.id ?? link.href} className="group relative">
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-1 whitespace-nowrap px-2 py-2 text-[14px] font-semibold transition-colors hover:text-gold ${
                    active ? "text-gold" : "text-white"
                  }`}
                >
                  <span {...ed(`nav.${i}.label`)}>{link.label}</span>
                  {!!link.children?.length && <ChevronDown className="h-3.5 w-3.5" />}
                  {active && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold" />}
                </Link>
                {!!link.children?.length && (
                  <div className="invisible absolute end-0 top-full min-w-72 rounded-lg border border-gold/50 bg-navy/95 py-2 opacity-0 shadow-xl backdrop-blur-md transition-all group-hover:visible group-hover:opacity-100">
                    {link.children.map((child, j) => {
                      const Icon = iconFor(child.icon);
                      return (
                        <Link
                          key={child.id ?? child.href}
                          href={child.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-gold/15 hover:text-gold"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold">
                            <Icon className="h-4 w-4 text-navy" />
                          </span>
                          <span {...ed(`nav.${i}.children.${j}.label`)}>{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <LangSwitch lang={lang} className="hidden xl:flex" />

        <a
          href={`tel:${s.phoneIntl}`}
          className="hidden shrink-0 items-center gap-2 rounded-md border border-gold px-4 py-2 text-base font-bold text-white transition-colors hover:bg-gold hover:text-navy xl:flex"
          dir="ltr"
        >
          <Phone className="h-4 w-4 text-gold" />
          <span {...ed("phoneDisplay")}>{s.phoneDisplay}</span>
        </a>

        <button className="p-2 text-white xl:hidden" onClick={() => setOpen((v) => !v)} aria-label={s.labels?.openMenu ?? "Menu"}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-navy px-4 py-3 xl:hidden">
          {nav.map((link) => (
            <div key={link.id ?? link.href} className="py-1">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-2 text-sm font-semibold ${isActive(link, pathname) ? "text-gold" : "text-white"}`}
              >
                {link.label}
              </Link>
              {!!link.children?.length && (
                <div className="ms-3 border-s-2 border-gold/50 ps-3">
                  {link.children.map((child) => {
                    const Icon = iconFor(child.icon);
                    return (
                      <Link
                        key={child.id ?? child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 py-1.5 text-sm text-white/80"
                      >
                        <Icon className="h-4 w-4 text-gold" />
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <LangSwitch lang={lang} className="mt-3 w-full justify-center" />
          <a
            href={`tel:${s.phoneIntl}`}
            className="mt-3 flex items-center justify-center gap-2 rounded-md border border-gold px-4 py-2 text-sm font-bold text-white"
            dir="ltr"
          >
            <Phone className="h-4 w-4 text-gold" />
            {s.phoneDisplay}
          </a>
        </nav>
      )}
    </header>
  );
}
