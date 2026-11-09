import Image from "next/image";
import { Quote, Star } from "lucide-react";
import PageHero from "@/components/PageHero";
import { editable, editableDoc, getGlobal, listDocs, media, pageMeta } from "@/lib/cms";

export const generateMetadata = () => pageMeta("testimonials-page");

// Same tile as the partners grid: the client shows up front, the review slides in on hover/focus (focus covers tapping on touch screens)
const TILE =
  "group relative flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-navy/10 outline-none transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-gold/60 focus-visible:ring-2 focus-visible:ring-gold";

type Tile = { name: string; company?: string | null; quote: string; rating?: number | null; photo?: ReturnType<typeof media> };

function ReviewTile({ name, company, quote, rating, photo, edit }: Tile & { edit?: object }) {
  return (
    <div tabIndex={0} className={TILE} {...edit}>
      <div className="text-center transition duration-300 group-hover:scale-95 group-hover:opacity-20 group-focus:opacity-20">
        {photo ? (
          <Image src={photo.src} alt={photo.alt || name} width={48} height={48} className="mx-auto mb-2 h-12 w-12 rounded-full object-cover" />
        ) : (
          <Quote className="mx-auto mb-2 h-6 w-6 text-gold" />
        )}
        <p className="text-lg font-extrabold text-navy/80">{name}</p>
        {company && <p className="text-sm text-gold-dark">{company}</p>}
        {!!rating && (
          <p className="mt-1 flex justify-center gap-0.5" aria-label={`${rating}/5`}>
            {Array.from({ length: rating }, (_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </p>
        )}
      </div>
      <div className="absolute inset-0 flex translate-y-full items-center justify-center overflow-y-auto whitespace-pre-line bg-navy/95 px-4 py-3 text-center text-sm leading-relaxed text-white transition duration-300 group-hover:translate-y-0 group-focus:translate-y-0">
        {quote}
      </div>
    </div>
  );
}

export default async function TestimonialsPage() {
  const [page, reviews, ed, edDoc] = await Promise.all([
    getGlobal("testimonials-page"),
    listDocs("testimonials"),
    editable("testimonials-page"),
    editableDoc(),
  ]);
  const ph = page.placeholder;
  return (
    <main>
      <PageHero title={page.title} ed={ed} />

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {reviews.length
            ? reviews.map((r) => (
                <ReviewTile
                  key={r.id}
                  name={r.name}
                  company={r.company}
                  quote={r.quote}
                  rating={r.rating}
                  photo={media(r.photo)}
                  edit={edDoc("testimonials", r.id)}
                />
              ))
            : // Shown until real reviews are published: only the field names, no invented text
              Array.from({ length: 8 }, (_, i) => (
                <ReviewTile key={i} name={ph?.name ?? ""} company={ph?.company} quote={ph?.quote ?? ""} edit={i === 0 ? ed("placeholder.name") : undefined} />
              ))}
        </div>
      </section>
    </main>
  );
}
