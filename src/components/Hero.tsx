import PhotoHero from "@/components/PhotoHero";

/* Bus fills the lower ~60% of the 3:2 photo and the sky above it is empty. The hero is tall enough on lg to show
   that sky, and the copy sits on the right pinned to the top, over sky and skyline, clear of the bus. On phones a
   4:3 crop pinned right keeps the whole bus and only trims empty sky and the left-hand block. */
export default function Hero() {
  return (
    <PhotoHero
      image="/images/hero-bus-amman.png"
      alt="حافلة الأجنحة الذهبية على طريق في عمّان"
      objectPosition="object-[100%_85%]"
      heightClass="lg:min-h-[720px] 2xl:min-h-[780px]"
      mobileAspect="4/3"
      alignTop
      title="الأجنحة الذهبية لخدمة النقل وتأجير الحافلات الأردنية"
      description="حلول نقل متكاملة تلبي تطلعاتكم"
    />
  );
}
