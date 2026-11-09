import InquiryForm from "@/components/InquiryForm";
import { cms, editable, getGlobal, getSettings, listDocs, pageMeta } from "@/lib/cms";
import { getLang } from "@/lib/getLang";

export const generateMetadata = () => pageMeta("booking-page");

/** ?tier=<Arabic name> is the link format of the pre-CMS fleet page, still honoured for old shared links */
async function idFromTier(tier?: string) {
  if (!tier) return undefined;
  const { docs } = await (await cms()).find({ collection: "vehicles", locale: "ar", depth: 0, limit: 1, where: { name: { equals: tier } } });
  return docs[0]?.id;
}

export default async function BookingPage({ searchParams }: { searchParams: Promise<{ vehicle?: string; tier?: string }> }) {
  const { vehicle, tier } = await searchParams;
  const [lang, page, s, vehicles, ed, tierId] = await Promise.all([
    getLang(),
    getGlobal("booking-page"),
    getSettings(),
    listDocs("vehicles", { bookable: { not_equals: false } }),
    editable("booking-page"),
    idFromTier(tier),
  ]);
  const initial = vehicles.find((v) => String(v.id) === vehicle || v.id === tierId);

  return (
    <main>
      <section className="bg-[#faf7f2] py-14 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h1 className="mb-6 text-2xl font-extrabold text-navy lg:text-3xl" {...ed("title")}>
            {page.title}
          </h1>
          <InquiryForm
            lang={lang}
            vehicles={vehicles.map((v) => ({ id: v.id, name: v.name }))}
            initialVehicle={initial?.id}
            copy={page}
            whatsapp={s.whatsapp}
          />
        </div>
      </section>
    </main>
  );
}
