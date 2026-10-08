import Image from "next/image";
import { Quote } from "lucide-react";
import CtaButtons from "@/components/CtaButtons";

type PhotoHeroProps = {
  image: string;
  alt: string;
  /** Tailwind object-position utility, e.g. "object-[center_70%]", keeps the subject in frame as the hero height changes */
  objectPosition?: string;
  /** Taller hero for squarer source photos, so object-cover crops far less of the frame */
  heightClass?: string;
  /** Below lg, show the photo at this aspect ratio (e.g. "2.36/1") with the copy stacked beneath on navy, instead of overlaying, stops ultrawide photos being cropped to a sliver on phones */
  mobileAspect?: string;
  /** Which side the copy sits on, put it over the emptier half of the photo. Default "right". */
  textSide?: "right" | "left";
  /** Pin the copy to the top of the hero instead of centring it, for photos where the subject fills the lower half */
  alignTop?: boolean;
  title: string;
  /** Gold line under the title */
  subtitle?: string;
  description?: string;
  chip?: string;
  /** Hide the call / book buttons, for pages that show their own booking button right below */
  hideCta?: boolean;
};

export default function PhotoHero({
  image,
  alt,
  objectPosition = "object-center",
  heightClass = "min-h-[400px] lg:min-h-[500px]",
  textSide = "right",
  mobileAspect,
  alignTop = false,
  title,
  subtitle,
  description,
  chip,
  hideCta = false,
}: PhotoHeroProps) {
  return (
    <section
      className={`relative isolate overflow-hidden ${mobileAspect ? "max-lg:bg-navy" : ""}`}
    >
      <div
        className={
          mobileAspect
            ? "relative w-full lg:absolute lg:inset-0 lg:!aspect-auto"
            : "absolute inset-0"
        }
        style={mobileAspect ? { aspectRatio: mobileAspect } : undefined}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${objectPosition}`}
        />
        {/* Scrim gradient rather than a solid panel, keeps the bus visible while the text side stays dark enough to read */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${mobileAspect ? "max-lg:hidden" : ""} ${
            textSide === "right"
              ? "from-navy/10 via-navy/55 to-navy/90"
              : "from-navy/90 via-navy/55 to-navy/10"
          }`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/55 to-transparent ${
            mobileAspect ? "max-lg:hidden" : ""
          }`}
        />
      </div>

      <div
        className={`relative mx-auto flex px-4 py-12 lg:py-16 ${alignTop ? "lg:items-start" : "lg:items-center"} ${
          textSide === "left" ? "max-w-none lg:px-[5%]" : "max-w-7xl lg:px-8"
        } ${heightClass}`}
      >
        <div
          className={`w-full text-center text-white lg:text-right ${
            textSide === "right" ? "lg:ml-auto lg:w-[40%]" : "lg:mr-auto lg:w-[32%]"
          }`}
        >
          <h1
            className={`text-3xl font-extrabold leading-tight drop-shadow-[0_2px_8px_rgba(10,25,47,0.8)] ${
              textSide === "left" ? "lg:text-4xl" : "lg:text-5xl"
            }`}
          >
            {title}
          </h1>

          {subtitle && (
            <p className="mt-3 text-xl font-bold text-gold drop-shadow-[0_1px_6px_rgba(10,25,47,0.9)] lg:text-2xl">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="mt-5 text-base leading-loose text-white/90 drop-shadow-[0_1px_6px_rgba(10,25,47,0.9)] lg:text-lg">
              {description}
            </p>
          )}

          {!hideCta && (
            <div className="mt-8 flex justify-center lg:justify-start">
              <CtaButtons dark />
            </div>
          )}
        </div>
      </div>

      {chip && (
        <div
          className={`absolute bottom-10 hidden max-w-[240px] ${
            textSide === "right" ? "left-10" : "right-10"
          } items-start gap-2.5 rounded-2xl border border-white/15 bg-navy/85 px-5 py-4 text-white shadow-xl backdrop-blur-md lg:flex`}>
          <Quote className="h-5 w-5 shrink-0 text-gold" />
          <span className="text-sm font-semibold leading-snug">{chip}</span>
        </div>
      )}
    </section>
  );
}
