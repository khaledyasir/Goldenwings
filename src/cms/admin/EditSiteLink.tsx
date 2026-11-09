/** Prominent entry to the visual editor, shown above the admin navigation */
export function EditSiteLink() {
  return (
    // A full navigation on purpose: the route sets the edit cookie and redirects; <Link> would prefetch/client-route it
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/api/edit-mode?path=/"
      style={{
        display: "block",
        margin: "0 0 16px",
        padding: "10px 14px",
        borderRadius: 6,
        background: "#c5a059",
        color: "#0a192f",
        fontWeight: 700,
        textAlign: "center",
        textDecoration: "none",
      }}
    >
      تعديل الموقع / Edit Website
    </a>
  );
}
