import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { COMPANY, SLOGAN } from "@/lib/constants";
import { getLang } from "@/lib/getLang";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: COMPANY[lang], description: SLOGAN[lang] };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getLang();
  return (
    <html lang={lang} dir={lang === "en" ? "ltr" : "rtl"} className={`${cairo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col max-md:pb-14">
        <Navbar lang={lang} />
        {children}
        <Footer />
        <SocialSidebar />
      </body>
    </html>
  );
}
