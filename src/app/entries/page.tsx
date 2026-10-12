import type { Metadata } from "next";
import EntryForm from "@/components/EntryForm";

export const metadata: Metadata = {
  title: "الإدخالات",
};

export default function EntriesPage() {
  return (
    <main>
      <section className="bg-[#faf7f2] py-14 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h1 className="mb-6 text-2xl font-extrabold text-navy lg:text-3xl">صفحة الإدخالات</h1>
          <EntryForm />
        </div>
      </section>
    </main>
  );
}
