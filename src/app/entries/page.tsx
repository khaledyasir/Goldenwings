import type { Metadata } from "next";
import EntryForm from "@/components/EntryForm";
import { getLang } from "@/lib/getLang";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return { title: t(await getLang(), "الإدخالات", "Entries") };
}

export default async function EntriesPage() {
  const lang = await getLang();
  return (
    <main>
      <section className="bg-[#faf7f2] py-14 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h1 className="mb-6 text-2xl font-extrabold text-navy lg:text-3xl">
            {t(lang, "صفحة الإدخالات", "Input Page")}
          </h1>
          <EntryForm lang={lang} />
        </div>
      </section>
    </main>
  );
}
