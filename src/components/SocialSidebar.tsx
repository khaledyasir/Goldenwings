import { CONTACT_ICONS } from "@/components/contactIcons";

// Gold so it stands out over both the navy header/footer and the page photos
export default function SocialSidebar() {
  return (
    <nav
      aria-label="تواصل معنا"
      // Phones: bottom bar so it never covers content. md+: right-edge rail, vertically centred (the document asks for the right of the page).
      className="fixed z-40 flex overflow-hidden bg-gold shadow-lg max-md:inset-x-0 max-md:bottom-0 max-md:border-t max-md:border-navy/30 md:right-0 md:top-1/2 md:-translate-y-1/2 md:flex-col md:rounded-l-xl"
    >
      {CONTACT_ICONS.map(({ label, href, icon: Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex items-center justify-center text-navy transition hover:bg-navy hover:text-gold max-md:h-14 max-md:flex-1 max-md:flex-col max-md:gap-0.5 md:h-12 md:w-12"
        >
          <Icon className="h-6 w-6" />
          <span className="text-[11px] font-semibold md:hidden">{label}</span>
        </a>
      ))}
    </nav>
  );
}
