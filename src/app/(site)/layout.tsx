import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { getLang } from "@/lib/getLang";
import { getSettings, isEditing } from "@/lib/cms";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import EditorLoader from "@/components/edit/EditorLoader";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: s.seo?.title || s.companyName,
    description: s.seo?.description || s.slogan,
    // Draft previews must never be indexed
    ...((await isEditing()) && { robots: { index: false, follow: false } }),
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [lang, settings, editing] = await Promise.all([getLang(), getSettings(), isEditing()]);
  return (
    <html lang={lang} dir={lang === "en" ? "ltr" : "rtl"} className={`${cairo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col max-md:pb-14">
        <Navbar lang={lang} settings={settings} editing={editing} />
        {children}
        <Footer />
        <SocialSidebar />
        {editing && <EditorLoader lang={lang} />}
      </body>
    </html>
  );
}
