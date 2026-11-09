/**
 * Everything the site showed before the CMS, copied verbatim from the old source files so the database-backed site
 * renders identically. Values are { ar, en } pairs; images are files in /public imported into the media library.
 */
type Bi = { ar: string; en: string };
export type SeedImage = { __media: string; alt: Bi };

const b = (ar: string, en: string): Bi => ({ ar, en });
export const img = (file: string, ar: string, en: string): SeedImage => ({ __media: file, alt: b(ar, en) });

const IMG = {
  heroBus: img("public/images/hero-bus-amman.png", "حافلة الأجنحة الذهبية على طريق في عمّان", "A Golden Wings bus on a road in Amman"),
  employeeHero: img("public/images/employee-hero.png", "موظفون يستقلون حافلة الأجنحة الذهبية أمام مبنى شركة", "Employees boarding a Golden Wings bus in front of a company building"),
  tourismHero: img("public/images/tourism-hero.png", "حافلة الأجنحة الذهبية مع مجموعة سياحية عند البتراء", "A Golden Wings bus with a tour group at Petra"),
  intlBanner: img("public/images/international-banner.png", "حافلة الأجنحة الذهبية قرب مطار الملكة علياء الدولي", "A Golden Wings bus near Queen Alia International Airport"),
  serviceEmployee: img("public/images/service-employee.png", "حافلة نقل موظفين أمام مبنى شركة", "An employee transport bus in front of a company building"),
  serviceTourism: img("public/images/service-tourism.png", "حافلة سياحية على طريق وادي رم", "A tourist bus on a Wadi Rum road"),
  serviceIntl: img("public/images/service-international.png", "حافلة الأجنحة الذهبية على طريق ساحلي", "A Golden Wings bus on a coastal road"),
  saudi: img("public/images/intl/saudi.jpg", "نقل الحجاج والمعتمرين إلى المملكة العربية السعودية", "Transportation for Hajj and Umrah Pilgrims to Saudi Arabia"),
  syria: img("public/images/intl/syria.jpg", "نقل المعتمرين من سوريا إلى السعودية", "Umrah Transportation from Syria to Saudi Arabia"),
  lebanon: img("public/images/intl/lebanon.jpg", "نقل المعتمرين من لبنان إلى السعودية", "Umrah Transportation from Lebanon to Saudi Arabia"),
  intlTourism: img("public/images/intl/tourism.jpg", "النقل السياحي الدولي", "International Tourism Transportation"),
  map: img("public/images/intl/map.jpg", "خريطة مسارات النقل الدولي بين الأردن والسعودية وسوريا ولبنان والضفة الغربية", "Map of international transport routes between Jordan, Saudi Arabia, Syria, Lebanon and the West Bank"),
  fleetBus: img("public/images/fleet-large.png", "حافلة من أسطول الأجنحة الذهبية", "A Golden Wings fleet bus"),
  logo: img("public/logo-header.png", "الأجنحة الذهبية لخدمة النقل وتأجير الحافلات الأردنية", "Golden Wings Jordanian Bus Rental & Transportation Services"),
};

const COMPANY = b("الأجنحة الذهبية لخدمة النقل وتأجير الحافلات الأردنية", "Golden Wings Jordanian Bus Rental & Transportation Services");
const SLOGAN = b("حلول نقل متكاملة تلبي تطلعاتكم", "Comprehensive transportation solutions that meet your expectations");
const BOOK_NOW = b("احجز الآن", "Book Now");
const seo = (title: Bi, description?: Bi) => ({ title, description: description ?? b("", "") });

const SERVICE_LINKS = [
  { label: b("نقل موظفين الشركات والمؤسسات والمصانع", "Industrial Establishments, Corporations & Companies' Employee Transportation"), href: "/employee-transport", icon: "Users" },
  { label: b("النقل السياحي المتخصص", "Specialized Tourism Transportation"), href: "/tourism-transport", icon: "Mountain" },
  { label: b("النقل الدولي", "International Transportation"), href: "/international-transport", icon: "Globe" },
  { label: b("نقل المطار والمعابر الحدودية", "Airport and Border Crossing Transportation"), href: "/airport-transport", icon: "Plane" },
];

export const GLOBALS: Record<string, Record<string, unknown>> = {
  settings: {
    companyName: COMPANY,
    slogan: SLOGAN,
    logo: IMG.logo,
    seo: seo(COMPANY, SLOGAN),
    phoneDisplay: "079 629 0390",
    phoneIntl: "+962796290390",
    whatsapp: "962796290390",
    email: "sales@goldenwingsjo.com",
    facebookUrl: "https://web.facebook.com/GoldenWings.Transport/?_rdc=1&_rdr#",
    instagramUrl: "https://www.instagram.com/p/DeZrdfwChYq/?dlrf=MWVsMW42cm5yd2t5MQ==",
    mapsQuery: "الأجنحة الذهبية لخدمة النقل وتأجير الحافلات الأردنية، عمّان",
    nav: [
      { label: b("الرئيسية", "Home"), href: "/", children: [] },
      { label: b("خدماتنا", "Our Services"), href: "/#services", children: SERVICE_LINKS },
      { label: b("أسطولنا", "Our Fleet"), href: "/fleet", children: [] },
      { label: b("الشركاء", "Our Partners"), href: "/partners", children: [] },
      { label: b("آراء العملاء", "Customer Reviews"), href: "/testimonials", children: [] },
      { label: b("الحجز", "Booking"), href: "/booking", children: [] },
      { label: b("دليل الرحلات", "Trip Guide"), href: "/trips", children: [] },
      { label: b("الإدخالات", "Entries"), href: "/entries", children: [] },
    ],
    footerLinks: [...SERVICE_LINKS.map(({ label, href }) => ({ label, href })), { label: BOOK_NOW, href: "/booking" }],
    labels: {
      call: b("اتصال", "Call"),
      bookNow: BOOK_NOW,
      ourServices: b("خدماتنا", "Our Services"),
      contactUs: b("تواصل معنا", "Contact Us"),
      whatsapp: b("واتساب", "WhatsApp"),
      email: b("البريد", "Email"),
      facebook: b("فيسبوك", "Facebook"),
      instagram: b("انستا", "Instagram"),
      openMenu: b("فتح القائمة", "Open menu"),
      copyright: b(
        "حقوق الطبع والنشر © {year} الأجنحة الذهبية لخدمة النقل وتاجير الحافلات. جميع الحقوق محفوظة.",
        "Copyright © {year} Golden Wings Jordanian Bus Rental & Transportation Services. All rights reserved.",
      ),
    },
  },

  home: {
    seo: seo(b("نقل موظفين الشركات والمؤسسات والمنشئات الصناعية", "Industrial Establishments, Corporations & Companies' Employee Transportation")),
    hero: { image: IMG.heroBus, title: COMPANY, description: SLOGAN },
    servicesTitle: b("خدماتنا", "Our Services"),
    services: [
      { title: b("نقل الموظفين", "Employee Transportation"), description: b("تأجير الحافلات الأردنية", "Jordanian bus rental services."), href: "/employee-transport", image: IMG.serviceEmployee, icon: "Users" },
      { title: b("النقل السياحي المتخصص", "Specialized Tourism Transportation"), description: b("رحلات سياحية بأعلى مستوى", "Premium-quality tourist trips."), href: "/tourism-transport", image: IMG.serviceTourism, icon: "Mountain" },
      { title: b("النقل الدولي", "International Transportation"), description: b("خدمات نقل خارج الأردن الى مختلف الوجهات", "Transportation services abroad to various international destinations."), href: "/international-transport", image: IMG.serviceIntl, icon: "Plane" },
    ],
    partnersTitle: b("الشركاء", "Our Partners"),
    valueProps: [
      { text: b("حافلات حديثة", "Modern Buses"), icon: "ShieldCheck" },
      { text: b("الالتزام بمواعيد الحجوزات", "Punctual and Reliable Bookings"), icon: "Clock" },
      { text: b("سائقون ذوو خبرة", "Experienced Drivers"), icon: "UserCheck" },
      { text: b("خدمة عملاء على مدار الساعة", "24/7 Customer Service"), icon: "Headset" },
    ],
    mapTitle: b("خريطة الموقع", "Location Map"),
  },

  "employee-transport": {
    seo: seo(b("نقل موظفين الشركات والمؤسسات والمصانع", "Industrial Establishments, Corporations & Companies' Employee Transportation")),
    hero: { image: IMG.employeeHero, title: b("تأجير الحافلات الأردنية", "Jordanian Bus Rental"), bookLabel: b("طلب عرض سعر", "Request a Quote") },
    intro: b(
      "الأجنحة الذهبية لتأجير الحافلات الأردنية متخصصة في نقل الموظفين وتأجير الحافلات الأردنية وتقدم خدمة نقل احترافية للشركات والمؤسسات والجامعات بحافلات حديثة ومريحة، وآمنة، وفريق سائقين محترفين، وتنظيم دقيق للمسارات والمواعيد وفق احتياجات كل جهة، لضمان تجربة نقل موثوقة، مريحة ومنظمة",
      "Golden Wings Jordanian Bus Rental specializes in employee transportation and Jordanian bus rental services, providing professional transportation solutions for companies, corporations and universities, using modern, comfortable and safe buses supported by a team of professional drivers. Our routes and schedules are carefully organized to meet each organization's needs and ensure a reliable, comfortable and well-organized transportation experience.",
    ),
    stats: b(
      "على مدار[20]عام تنطلق كل صباح[57]رحلة تقل[1197]موظف الى مواقع عملهم بكل سهولة ويسر",
      "For over[20]years, we have operated[57]daily morning trips, transporting[1197]employees to their workplaces smoothly and efficiently.",
    ),
    features: [
      { icon: "Building2", text: b("خدمة نقل الموظفين للشركات والمؤسسات", "Companies and corporations' employee transportation.") },
      { icon: "Factory", text: b("حلول نقل متكاملة لموظفي المصانع", "Comprehensive transportation solutions for factory employees.") },
      { icon: "Users", text: b("خدمة نقل المشاركين والمنظمات والجمعيات", "Transportation services for participants, organizations and associations.") },
      { icon: "FileText", text: b("عقود نقل الموظفين (شهرية وسنوية) للشركات والمؤسسات حسب احتياجاتها", "Monthly and annual employee transportation contracts tailored to the companies and corporations' needs.") },
      { icon: "GraduationCap", text: b("نقل طلبة الجامعات والكليات", "University and college student transportation.") },
      { icon: "Compass", text: b("تقديم استشارات النقل داخل الأردن وخارجه", "Transportation consultation services within and without Jordan.") },
    ],
  },

  "tourism-transport": {
    seo: seo(b("النقل السياحي المتخصص", "Specialized Tourism Transportation")),
    hero: {
      image: IMG.tourismHero,
      title: b("النقل السياحي [المتخصص]", "[Specialized] Tourism Transportation"),
      subtitle: b("نقل السياح والمجموعات السياحي", "for Tourists and Groups"),
      description: b(
        "خدمة نقل سياحي متكاملة للسياح، والمجموعات السياحية، والزوار القادمين من خارج الأردن، من خلال فريق محترف وخبرة تمتد لأكثر من 20 عام في مجال النقل السياحي المتخصص انطلق معنا إلى أفضل الوجهات السياحية في الأردن.",
        "Comprehensive tourist transportation services for individual travelers, tour groups and visitors arriving from abroad. With a professional team and more than 20 years of experience in specialized tourism transportation, we take you to Jordan's finest destinations.",
      ),
    },
    sections: [
      {
        icon: "Mountain",
        image: IMG.serviceTourism,
        imageAlt: b("حافلة الأجنحة الذهبية على طريق وادي رم", "A Golden Wings bus on a Wadi Rum road"),
        text: b(
          "السياحة الداخلية والرحلات الاستكشافية الى جميع الوجهات السياحية، والأودية، خدمات نقل سياحي متخصص لعشاق الاستكشاف وسياحة المغامرات والتخييم.",
          "Domestic Tourism and Exploration Trips – Explore Jordan and all its tourist destinations and valleys. We provide specialized tourist transportation for exploration enthusiasts, adventure and camping groups.",
        ),
      },
      {
        icon: "Plane",
        image: IMG.intlBanner,
        text: b(
          "استقبال السياح والمجموعات السياحية من مطار الملكة علياء ونقلهم إلى الفنادق بما يضمن بداية مريحة ومنظمة لزيارتهم في الأردن، باختيارك الأجنحة الذهبية سيكون فريقنا باستقبالك واصطحابك الى وجهتك وتسهيل وصولك لتجربة مليئة بالفخامة.",
          "Airport Pickup and Hotel Transfers – We welcome tourists and tour groups arriving at Queen Alia International Airport and transportation them to their hotels, ensuring a comfortable and well-organized start to their visit to Jordan. When you choose Golden Wings, our team will welcome you, accompany you to your destination and make your arrival seamless, creating a luxurious travel experience.",
        ),
      },
    ],
    closing: b("سيقدم لكم فريقنا المحترف تجربة نقل لرحلة استثنائية", "Our professional team will provide you with an exceptional transportation experience."),
    whyTitle: b("لماذا تختار الأجنحة الذهبية للنقل السياحي؟", "Why Choose Golden Wings for Tourism Transportation?"),
    why: [
      b("خدمة استقبال وتوصيل من وإلى المطار والمعابر الحدودية", "Airport and border-crossing pickup and drop-off services."),
      b("مركبات حديثة ومجهزة بأعلى المعايير", "Modern vehicles equipped to the highest standards."),
      b("فريق محترف وسائقون لديهم خبرة واسعة بالوجهات السياحية", "Professional team and experienced drivers familiar with tourist destinations."),
      b("سهولة الحجز", "Easy booking process."),
      b("الالتزام بالمواعيد", "Punctual and reliable service."),
      b("رحلات نقل مخصصة حسب الوجهة وعدد المسافرين", "Customized transportation trips based on destinations and number of passengers."),
    ].map((text) => ({ text })),
  },

  "international-transport": {
    seo: seo(b("النقل الدولي", "International Transportation")),
    hero: {
      image: IMG.intlBanner,
      title: b("خدمات النقل الدولي", "International Transportation Services"),
      subtitle: b("بين الأردن والسعودية وسوريا ولبنان", "Between Jordan, Saudi Arabia, Syria and Lebanon"),
      description: b(
        "تقدم الأجنحة الذهبية لتأجير الحافلات خدمات النقل الدولي بالحافلات للحجاج والمعتمرين والسياح والمجموعات، مع حلول نقل منظمة ومريحة تربط بين الأردن والمملكة العربية السعودية وسوريا ولبنان، والضفة الغربية مع الاهتمام براحة الركاب وتنظيم الرحلة من نقطة الانطلاق وحتى الوصول إلى الوجهة.",
        "Golden Wings Bus Rental provides international bus transportation services for Hajj and Umrah pilgrims, tourists and groups. We offer organized and comfortable transportation solutions connecting Jordan with Saudi Arabia, Syria, Lebanon and the West Bank, prioritizing passenger comfort and carefully coordinating every trip from departure to arrival.",
      ),
    },
    services: [
      {
        title: b("نقل الحجاج والمعتمرين إلى المملكة العربية السعودية", "Transportation for Hajj and Umrah Pilgrims to Saudi Arabia"),
        text: b(
          "نوفر خدمات نقل الحجاج والمعتمرين إلى السعودية لأداء مناسك الحج والعمرة، بالإضافة إلى خدمات التنقل بين المدن والمشاعر المقدسة، وفق برنامج الرحلة واحتياجات المجموعة.",
          "We provide transportation services to Hajj and Umrah pilgrims traveling to Saudi Arabia to perform their religious rituals. We also arrange transportation between cities and the holy sites according to each group's itinerary and requirements.",
        ),
        image: IMG.saudi,
      },
      {
        title: b("نقل المعتمرين من سوريا إلى السعودية", "Umrah Transportation from Syria to Saudi Arabia"),
        text: b(
          "نوفر خدمات نقل المعتمرين من سوريا إلى المملكة العربية السعودية، مع تنظيم رحلات المجموعات ونقل المعتمرين إلى وجهاتهم داخل المملكة، بما في ذلك التنقل خلال برنامج العمرة والمشاعر المقدسة.",
          "We provide transportation to Umrah pilgrims traveling from Syria to Saudi Arabia, organizing group journeys and transportation to destinations nationwide, including travels during their Umrah itinerary and visits to the holy sites.",
        ),
        image: IMG.syria,
      },
      {
        title: b("نقل المعتمرين من لبنان إلى السعودية", "Umrah Transportation from Lebanon to Saudi Arabia"),
        text: b(
          "نقدم خدمات نقل المعتمرين من لبنان إلى المملكة العربية السعودية، من خلال حافلات مناسبة للمجموعات، وخدمة نقل منظمة تراعي احتياجات الرحلة منذ الانطلاق وحتى الوصول.",
          "We provide transportation to Umrah pilgrims traveling from Lebanon to Saudi Arabia, offering suitable buses to groups and organized transportation services tailored to the trip needs from departure to arrival.",
        ),
        image: IMG.lebanon,
      },
      {
        title: b("النقل السياحي الدولي", "International Tourism Transportation"),
        text: b(
          "تقدم الأجنحة الذهبية للنقل الدولي حلول النقل السياحي الدولي بالحافلات للمجموعات السياحية بين الأردن وسوريا ولبنان",
          "Golden Wings provides international tourist bus transportation to groups traveling between Jordan, Syria and Lebanon",
        ),
        bold: b(
          "(خدمات نقل السياح من الأردن إلى سوريا ولبنان، نقل السياح من سوريا ولبنان إلى الأردن)",
          "(Tourist transportation from Jordan to Syria and Lebanon, Tourist transportation from Syria and Lebanon to Jordan).",
        ),
        more: b(
          "نهدف إلى توفير تجربة سفر مريحة ومنظمة، مع حافلات مجهزة وسائقين محترفين لمرافقة المجموعات خلال رحلاتهم الدولية.",
          "Our goal is to provide a comfortable and well-organized travel experience, using well-equipped buses and professional drivers to accompany groups throughout their journeys.",
        ),
        image: IMG.intlTourism,
      },
    ],
    countries: [b("الأردن", "Jordan"), b("السعودية", "Saudi Arabia"), b("سوريا", "Syria"), b("لبنان", "Lebanon"), b("الضفة الغربية", "West Bank")].map((name) => ({ name })),
    mapImage: IMG.map,
  },

  "airport-transport": {
    seo: seo(b("نقل المطار والمعابر الحدودية", "Airport and Border Crossing Transportation")),
    hero: {
      image: IMG.intlBanner,
      title: b("النقل السياحي من وإلى المطار والمعابر الحدودية", "Tourist Transportation to and from Airports and Border Crossings"),
      description: b("", "Book Your Airport or Border Crossing Transportation Today."),
    },
    intro: b(
      "تنقل مريح وآمن مع الأجنحة الذهبية للنقل السياحي. خدمات نقل سياحي احترافية للسياح والقادمين والمغادرين من وإلى مطار الملكة علياء الدولي والمعابر الحدودية، أو الفنادق في مختلف الوجهات السياحية.",
      "Enjoy comfortable and safe transportation with Golden Wings Tourism Transportation. We provide professional tourist transportation services to both arriving and departing travelers to and from Queen Alia International Airport and border crossings or hotels in various tourist destinations.",
    ),
    cards: [
      {
        icon: "Plane",
        title: b("نقل السياح من وإلى مطار الملكة علياء الدولي", "Tourist Transportation to and from Queen Alia International Airport"),
        text: b(
          "مع اختيارك للأجنحة الذهبية للنقل السياحي، سيكون فريقنا بانتظارك عند الوصول لاستقبالك ومساعدتك في نقل أمتعتك واصطحابك إلى وجهتك بكل راحة، سواء كنت متجهاً إلى أحد فنادق عمّان أو إلى أي مدينة أو موقع سياحي في الأردن، نحرص على توفير تجربة نقل فاخرة، تضمن وصولك في الوقت المحدد.",
          "When you choose Golden Wings, our team will be waiting for you upon arrival to welcome you, assist with your luggage and accompany you comfortably to your destination. Whether you are traveling to a hotel in Amman, or to another city or tourist destination anywhere in Jordan, we are committed to providing you with a premium transportation experience that ensures you arrive on time.",
        ),
        points: [],
      },
      {
        icon: "Landmark",
        title: b("النقل من وإلى معبر الشيخ حسين", "Transportation to and from Sheikh Hussein Border Crossing"),
        text: b(
          "نوفر خدمة النقل السياحي من وإلى معبر الشيخ حسين لمختلف أعداد المسافرين، أياً كانت وجهتك داخل الأردن.",
          "We provide tourist transportation to and from Sheikh Hussein Border Crossing to groups and individual travelers regardless of their destination within Jordan.",
        ),
        points: [
          b("مطار الملكة علياء الدولي", "Queen Alia International Airport."),
          b("فنادق عمّان", "Hotels in Amman."),
          b(
            "المواقع السياحية (البتراء، وادي رم، العقبة، أم قيس، جرش، عجلون، القصور الصحراوية، ضانا وأي وجهة سياحية)",
            "Tourist attractions (Petra, Wadi Rum, Aqaba, Umm Qais, Jerash, Ajloun, the Desert Castles, Dana... any other tourist destinations).",
          ),
        ].map((text) => ({ text })),
      },
      {
        icon: "Landmark",
        title: b("النقل من وإلى جسر الملك حسين", "Transportation to and from King Hussein Bridge"),
        text: b(
          "خدمات النقل من وإلى جسر الملك حسين للمجموعات والأفراد، إلى مختلف الوجهات سواء كانت وجهتك مطار الملكة علياء الدولي أو أحد فنادق عمّان أو أي موقع سياحي في الأردن.",
          "We provide transportation services to and from King Hussein Bridge to groups and individuals traveling to various destinations. Whether your destination is Queen Alia International Airport, a hotel in Amman, or any tourist attraction in Jordan, we offer reliable and comfortable transportation tailored to your journey.",
        ),
        points: [],
      },
    ],
  },

  "fleet-page": {
    seo: seo(b("أسطول الأجنحة الذهبية لتأجير الحافلات الأردنية", "Golden Wings Jordanian Bus Rental Fleet")),
    title: b("أسطول الأجنحة الذهبية لتأجير الحافلات الأردنية", "Golden Wings Jordanian Bus Rental Fleet"),
    categoriesHeading: b("الفئات", "Categories"),
    seatsLabel: b("{n} مقعد", "{n} seats"),
    seatsLabelFew: b("{n} مقاعد", "{n} seats"),
    safety: [
      { icon: "ShieldCheck", text: b("النوافذ تفتح حتى 5 سم فقط", "Windows open up to 5 cm only") },
      { icon: "DoorOpen", text: b("باب أوتوماتيكي", "Automatic door") },
      { icon: "ShieldPlus", text: b("معدات سلامة", "Safety equipment"), sub: b("مطرقة طوارئ وطفاية حريق وحقيبة إسعافات أولية", "Emergency hammer, fire extinguisher and first aid kit") },
      { icon: "Radio", text: b("نظام مراقبة المركبة (IVMS)", "Vehicle monitoring system (IVMS)") },
      { icon: "User", text: b("أحزمة الأمان", "Seat belts") },
      { icon: "ClipboardCheck", text: b("تأمين شامل", "Comprehensive insurance") },
      { icon: "Wrench", text: b("الصيانة الدورية", "Regular maintenance") },
      { icon: "Wifi", text: b("خدمات الإنترنت (Wi-Fi)", "Internet services (Wi-Fi)") },
    ],
  },

  "trips-page": {
    seo: seo(b("دليل الرحلات", "Trip Guide")),
    title: b("دليل الرحلات", "Trip Guide"),
    description: b(
      "اكتشف في هذا الدليل خيارات متنوعة لرحلات تناسب اهتماماتك وتطلعاتك: من المغامرات والتخييم إلى الجولات السياحية الجماعية والرحلات الفردية. سواء كنت تخطط لرحلتك مسبقًا أو تبحث عن وجهة مميزة لقضاء وقت ممتع دون الحاجة إلى حجز، ستجد هنا ما يساعدك على اختيار تجربتك بكل سهولة.",
      "Discover a variety of trips tailored to your interests and preferences, from adventure and camping experiences to group sightseeing tours and individual excursions. Whether you are planning your trip in advance or looking for a special destination to enjoy without making a reservation, this guide will help you choose your experience easily.",
    ),
    imageLabel: b("صورة", "Image"),
  },

  "partners-page": { seo: seo(b("الشركاء", "Our Partners")), title: b("الشركاء", "Our Partners") },

  "testimonials-page": {
    seo: seo(b("آراء العملاء", "Customer Reviews")),
    title: b("آراء العملاء", "Customer Reviews"),
    placeholder: { name: b("اسم العميل", "Customer Name"), company: b("الشركة", "Company"), quote: b("نص التقييم", "Review text") },
  },

  "booking-page": {
    seo: seo(b("حجز حافلة الأجنحة الذهبية لتأجير الحافلات الأردنية", "Booking a Bus of Golden Wings Jordanian Bus Rental")),
    title: b("حجز الآن", "Book Now"),
    labels: {
      name: b("الاسم", "Full Name"),
      phone: b("رقم الاتصال", "Contact Number"),
      email: b("البريد الإلكتروني", "Email Address"),
      vehicle: b("فئة الحافلة", "Bus Category"),
      start: b("تاريخ بداية الرحلة", "Trip Start Date"),
      end: b("تاريخ نهاية الرحلة", "Trip End Date"),
      from: b("نقطة الانطلاق", "Departure Point"),
      to: b("نقطة الوصول", "Destination"),
      message: b("اكتب تعليقك", "Additional Comments"),
      submit: b("إرسال", "Submit Booking"),
    },
    note: b(
      "*ستصلك رسالة عند تأكيد الحجز يرجى التأكد من رقم الهاتف",
      "*You will receive a message once your booking is confirmed. Please make sure your phone number is correct.",
    ),
    // New wording: the old form had no stored acknowledgement, it only opened WhatsApp
    success: b(
      "تم استلام طلب الحجز رقم {ref}. هذا طلب وليس تأكيداً، سنتواصل معك لتأكيد الحجز.",
      "We received your booking request {ref}. This is a request, not a confirmation; we will contact you to confirm.",
    ),
    error: b("تعذر إرسال الطلب، يرجى التحقق من الحقول أو الاتصال بنا.", "We could not send your request. Please check the fields or call us."),
    sendWhatsapp: b("إرسال نسخة عبر واتساب", "Also send via WhatsApp"),
  },

  "entries-page": {
    seo: seo(b("الإدخالات", "Entries")),
    title: b("صفحة الإدخالات", "Input Page"),
    labels: {
      movement: b("الحركة", "Activity"),
      type: b("النوع", "Service Type"),
      client: b("العميل", "Client"),
      trip: b("الرحلة", "Trip"),
      date: b("التاريخ", "Date"),
      bus: b("رقم الحافلة", "Bus Number"),
      driver: b("السائق", "Driver"),
      authorization: b("رقم التفويض", "Authorization Number"),
      statement: b("بيان", "Statement"),
      select: b("اختر", "Select"),
      submit: b("إرسال", "Send"),
    },
    success: b("تم حفظ الإدخال.", "Entry saved."),
    error: b("تعذر حفظ الإدخال، تحقق من الحقول.", "Could not save the entry, please check the fields."),
  },
};

// ---------------------------------------------------------------- collections

export const FLEET_CATEGORIES = [
  { title: b("الحافلات الكبيرة", "Large Buses"), layout: "detailed", vehicles: [[50, b("حافلة 50 راكب", "50-passenger bus")], [33, b("حافلة 33 راكب", "33-passenger bus")]] },
  {
    title: b("الحافلات المتوسطة", "Medium Buses"),
    layout: "detailed",
    vehicles: [[22, b("كوستر 22 راكب", "22-passenger Coaster")], [21, b("كوستر 21 راكب", "21-passenger Coaster")], [19, b("كوستر 19 راكب", "19-passenger Coaster")], [18, b("كوستر 18 راكب", "18-passenger Coaster")]],
  },
  { title: b("الحافلات الصغيرة", "Small Vans"), layout: "detailed", vehicles: [[11, b("فان 11 راكب", "11-passenger van")], [7, b("فان 7 ركاب", "7-passenger van")]] },
  { title: b("السيارات", "Cars"), layout: "compact", vehicles: [[3, b("سيدان 3 ركاب", "3-passenger Sedan")], [null, b("SUV", "SUV")]] },
] as const;

/** One shared list on every bus card in the old site; seeded onto each bus/van, editable per vehicle now */
export const AMENITIES: [string, Bi][] = [
  ["Tv", b("شاشات", "Screens")],
  ["Wifi", b("إنترنت", "Internet")],
  ["Volume2", b("نظام صوتي", "Sound system")],
  ["Snowflake", b("تبريد / تسخين", "Cooling / Heating")],
  ["Fan", b("نظام تهوية", "Ventilation system")],
  ["Usb", b("منفذ شاحن USB", "USB charging port")],
  ["PlugZap", b("قابس كهربائي 220V", "220V power outlet")],
  ["Lightbulb", b("إنارة", "Lighting")],
  ["Refrigerator", b("ثلاجة", "Refrigerator")],
  ["Cctv", b("كاميرات مراقبة", "CCTV cameras")],
  ["ShieldCheck", b("معدات الأمان والسلامة", "Safety and security equipment")],
  ["BriefcaseMedical", b("إسعافات أولية", "First aid")],
  ["Toilet", b("دورة مياه", "Restroom")],
];

export const FLEET_IMAGE = IMG.fleetBus;

/** The three carousels on /trips. No trips existed yet, so only the sections are seeded. */
export const TRIP_CATEGORIES = [
  { title: b("رحلات المغامرات والتخييم", "Adventure and Camping Trips"), kind: "scheduled", emptyHint: b("اسم الرحلة\nالتاريخ\nالحجز\nالسعر", "Trip Name\nDate\nBook (Contact Number)\nPrice") },
  { title: b("الرحلات السياحية", "Sightseeing Tours"), kind: "scheduled", emptyHint: b("اسم الجولة\nالتاريخ\nرقم هاتف الحجز\nالسعر", "Tour Name\nDate\nBooking Contact Number\nPrice") },
  { title: b("الرحلات الفردية (دليل المواقع)", "Individual Trips (Destination Guide)"), kind: "guide", emptyHint: b("الموقع\nالوصف", "Location\nDescription") },
];

const logo = (file: string, ar: string, en: string) => img(`public/partners/${file}`, `شعار ${ar}`, `${en} logo`);

export const PARTNERS: { name: Bi; logo?: SeedImage }[] = [
  { name: b("زلوم", "Zalloum"), logo: logo("zalloum.jpg", "زلوم", "Zalloum") },
  { name: b("الحياة", "Al Hayat"), logo: logo("hayat.png", "الحياة", "Al Hayat") },
  { name: b("جهد", "JOHUD"), logo: logo("johud.jpg", "جهد", "JOHUD") },
  { name: b("كات", "CAT"), logo: logo("cat.webp", "كات", "CAT") },
  { name: b("أبو شيخة", "Abu Sheikha"), logo: logo("abu-shikha.jpg", "أبو شيخة", "Abu Sheikha") },
  { name: b("سافيتو", "Saveto"), logo: logo("vetonit.jpg", "سافيتو", "Saveto") },
  { name: b("ترانسميد", "Transmed"), logo: logo("transmed.png", "ترانسميد", "Transmed") },
  { name: b("وزارة التربية والتعليم", "Ministry of Education"), logo: logo("moe.jpg", "وزارة التربية والتعليم", "Ministry of Education") },
  { name: b("كيبرز", "Keepers") },
  { name: b("المتطورة", "Al Mutatawwera") },
  { name: b("ورد", "Ward") },
  { name: b("جونفجيتر", "John Vegator") },
  { name: b("جوردترب", "JordTrip") },
  { name: b("يلا أدفنشر", "Yalla Adventure") },
  { name: b("فال", "Vaal") },
  { name: b("الهلال الأحمر", "the Red Crescent"), logo: logo("red-crescent.jpg", "الهلال الأحمر", "Red Crescent") },
];

/** The old form shipped these placeholder choices; seeded as-is so nothing changes, replace them in the admin */
export const ENTRY_OPTIONS: Record<string, Bi[]> = {
  movement: [b("سياحة", "Tourism"), b("نقل موظفين", "Employee Transportation")],
  type: [b("مستأجر", "Rented"), b("داخلي", "Internal")],
  client: [b("شركة 1", "Company 1"), b("شركة 2", "Company 2")],
  trip: [b("رحلة 1", "Trip 1"), b("رحلة 2", "Trip 2")],
  bus: [b("حافلة 1", "Bus 1"), b("حافلة 2", "Bus 2")],
  driver: [b("سائق 1", "Driver 1"), b("سائق 2", "Driver 2")],
  authorization: [b("تفويض 1", "Authorization 1"), b("تفويض 2", "Authorization 2")],
};
