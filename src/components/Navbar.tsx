"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown, Users, Mountain, Globe, Plane, MapPinned } from "lucide-react";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL, type NavLink } from "@/lib/constants";

const SERVICE_ICONS = {
  "/employee-transport": Users,
  "/tourism-transport": Mountain,
  "/international-transport": Globe,
  "/airport-transport": Plane,
  "/trips": MapPinned,
} as const;

function ChildIcon({ href, className }: { href: string; className: string }) {
  const Icon = SERVICE_ICONS[href as keyof typeof SERVICE_ICONS];
  return Icon ? <Icon className={className} /> : null;
}

function isActive(link: NavLink, pathname: string) {
  return link.href === pathname || !!link.children?.some((c) => c.href === pathname);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-md">
      {/* flex-row-reverse under RTL: logo sits on the left */}
      <div className="mx-auto flex max-w-7xl flex-row-reverse items-center justify-between gap-4 px-4 py-3 xl:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo-transparent.png"
            alt="الأجنحة الذهبية لخدمة النقل"
            width={260}
            height={144}
            className="h-14 w-auto xl:h-[72px]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link, pathname);
            return (
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-1 px-2.5 py-2 text-[15px] font-semibold transition-colors hover:text-gold ${
                    active ? "text-gold" : "text-white"
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown className="h-3.5 w-3.5" />}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold" />
                  )}
                </Link>
                {link.children && (
                  <div className="invisible absolute right-0 top-full min-w-72 rounded-lg border border-gold/50 bg-navy/95 py-2 opacity-0 shadow-xl backdrop-blur-md transition-all group-hover:visible group-hover:opacity-100">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-gold/15 hover:text-gold"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold">
                          <ChildIcon href={child.href} className="h-4 w-4 text-navy" />
                        </span>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <a
          href={PHONE_TEL}
          className="hidden shrink-0 items-center gap-2 rounded-md border border-gold px-4 py-2 text-base font-bold text-white transition-colors hover:bg-gold hover:text-navy xl:flex"
          dir="ltr"
        >
          <Phone className="h-4 w-4 text-gold" />
          {PHONE_DISPLAY}
        </a>

        <button
          className="p-2 text-white xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="فتح القائمة"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-navy px-4 py-3 xl:hidden">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="py-1">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-2 text-sm font-semibold ${
                  isActive(link, pathname) ? "text-gold" : "text-white"
                }`}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="mr-3 border-r-2 border-gold/50 pr-3">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 py-1.5 text-sm text-white/80"
                    >
                      <ChildIcon href={child.href} className="h-4 w-4 text-gold" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href={PHONE_TEL}
            className="mt-3 flex items-center justify-center gap-2 rounded-md border border-gold px-4 py-2 text-sm font-bold text-white"
            dir="ltr"
          >
            <Phone className="h-4 w-4 text-gold" />
            {PHONE_DISPLAY}
          </a>
        </nav>
      )}
    </header>
  );
}
