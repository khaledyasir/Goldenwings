import PhotoHero from "@/components/PhotoHero";
import { editable, getGlobal, media } from "@/lib/cms";

/* Bus fills the lower ~60% of the 3:2 photo and the sky above it is empty. The hero is tall enough on lg to show
   that sky, and the copy sits on the right pinned to the top, over sky and skyline, clear of the bus. On phones a
   4:3 crop pinned right keeps the whole bus and only trims empty sky and the left-hand block. */
export default async function Hero() {
  const [home, ed] = await Promise.all([getGlobal("home"), editable("home")]);
  return (
    <PhotoHero
      image={media(home.hero?.image)}
      ed={ed}
      objectPosition="object-[100%_85%]"
      heightClass="lg:min-h-[720px] 2xl:min-h-[780px]"
      mobileAspect="4/3"
      alignTop
      title={home.hero?.title ?? ""}
      description={home.hero?.description}
    />
  );
}
