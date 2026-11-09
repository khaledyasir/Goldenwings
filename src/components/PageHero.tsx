import RoadAccent from "@/components/RoadAccent";

export default function PageHero({
  title,
  description,
  ed = () => ({}),
}: {
  title?: string | null;
  description?: string | null;
  /** Visual edit markers; the page global's fields are `title` and `description` */
  ed?: (path: string) => object;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-14 text-center text-white lg:py-20">
      <RoadAccent tone="light" />
      <div className="relative mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="text-3xl font-extrabold lg:text-4xl" {...ed("title")}>
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-white/80" {...ed("description")}>
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
