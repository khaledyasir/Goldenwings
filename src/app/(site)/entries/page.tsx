import { redirect } from "next/navigation";
import EntryForm from "@/components/EntryForm";
import { cms, editable, getGlobal, getViewer, pageMeta } from "@/lib/cms";
import { entryOptions } from "@/lib/entries";
import { getLang } from "@/lib/getLang";

export const generateMetadata = async () => ({ ...(await pageMeta("entries-page")), robots: { index: false } });

export default async function EntriesPage() {
  // Staff-only operational form: anonymous visitors are sent to sign in first
  if (!(await getViewer())) redirect("/admin/login?redirect=%2Fentries");
  const [lang, page, ed] = await Promise.all([getLang(), getGlobal("entries-page"), editable("entries-page")]);
  const options = await entryOptions(await cms(), lang);
  return (
    <main>
      <section className="bg-[#faf7f2] py-14 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h1 className="mb-6 text-2xl font-extrabold text-navy lg:text-3xl" {...ed("title")}>
            {page.title}
          </h1>
          <EntryForm options={options} copy={page} />
        </div>
      </section>
    </main>
  );
}
