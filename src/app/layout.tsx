import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TaglineBand from "@/components/TaglineBand";
import SocialSidebar from "@/components/SocialSidebar";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "الأجنحة الذهبية لخدمة النقل وتأجير الحافلات الأردنية",
  description:
    "شركة متخصصة في نقل الموظفين وتأجير الحافلات الأردنية، والنقل السياحي المتخصص، والنقل الدولي.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col max-md:pb-14">
        <Navbar />
        {children}
        <TaglineBand />
        <Footer />
        <SocialSidebar />
      </body>
    </html>
  );
}
