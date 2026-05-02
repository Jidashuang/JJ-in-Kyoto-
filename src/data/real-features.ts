import type { Feature } from "@/types/feature";

export type RealFeature = Partial<Feature> & {
  slug?: string;
  title?: string;
  placeSlugs?: string[];
};

// Six experiential themes + one optional bath/stay theme.
// Each theme is a *time quality*, not a category.
// Non-overlapping: every place is assigned to at most one theme.
// Cover images follow the convention /images/features/{slug}.jpg — add the
// assets under public/images/features/ when ready. Until then, the features.ts
// builder falls back to /images/features/placeholder.jpg.

export const realFeatures: RealFeature[] = [
  {
    slug: "the-basement-hours",
    title: "The Basement Hours",
    subtitle: "喫茶時間",
    intro:
      "Borrowed time in rooms that stopped at 1950 and never restarted the clock.",
    body:
      "Kissaten is not a café genre — it is a way a room holds time. Kyoto kept the form when most other cities let it go, and the six rooms here are where that grammar is still intact: the stairs down to a basement at Rokuyosha, the silver coffee pots and white china at Inoda, the cool-blue spell of Soiree, the salon ceiling at Francois that has been in continuous performance since 1934, the morning hotcake at Smart from 1932, the long communal table at Kiridoshi Shinshindo where the silence holds even when the door opens. Read the collection as a single argument about pacing — none of these rooms reward a quick coffee. Sit through one drink. Order a doughnut you don't need. Let the regulars be regulars. The whole proposition is that an hour at a counter is not time wasted but time differently shaped.",
    coverImage: "/images/features/the-basement-hours.jpg",
    kind: "collection",
    tags: ["Kissaten", "Coffee", "Dim Light"],
    placeSlugs: [
      "rokuyosha-basement",
      "smart-coffee",
      "inoda-coffee-main-store",
      "kissa-soiree",
      "francois-kissaten",
      "kiridoshi-shinshindo",
    ],
  },
  {
    slug: "along-the-river",
    title: "Along the River",
    subtitle: "川沿い",
    intro:
      "An hour lived at the pace of the Kamo and the Takase.",
    body:
      "Kyoto reads differently from the water level. The Kamo doesn't run through the city so much as set its tempo — the bench rate, the morning jogger pace, the cherry-blossom rate in April, the kawayuka summer-deck rate from May. These three places only make sense with the river as a co-author. WIFE&HUSBAND rents you a picnic basket — thermos, mat, chair — so you can carry the café out four minutes east to a stretch of bank. Kotoka grills dango at the Demachi delta where the Takano and Kamo meet in a shallow triangle of stones; you walk a bridge, find a rock, eat the skewer warm. Misogikawa extends a wooden yuka platform out over the Kamo from May through September and dinner happens above moving water. None of them is destination food. The river is the destination; the kitchen happens to be there.",
    coverImage: "/images/features/along-the-river.jpg",
    kind: "collection",
    tags: ["Riverside", "Kamo", "Drift"],
    placeSlugs: [
      "wife-and-husband",
      "kotoka-kyoto",
      "pontocho-misogigawa",
    ],
  },
  {
    slug: "slow-hands",
    title: "Slow Hands",
    subtitle: "手の仕事",
    intro:
      "Objects made slowly by hands that were trained slowly.",
    body:
      "The Kyoto of wire mesh, tea canisters, folding fans, woodblock paper, pressed metal, ceramics, brushes, and old things worth keeping. What you take home from these places is not decoration — it is a tool that expects to be used for thirty years. Kaikado has been hand-rolling copper tea caddies since 1875; Tsujiwa Kanaami still folds tofu strainers out of brass wire one at a time; Aiba is one of the last hand-painted folding-fan workshops left in the city; Kamisoe prints karakami paper with woodblocks slow enough that you smell the pigment before you see the pattern. Naito Shoten sells palm-fiber brushes at prices working kitchens still pay. Kawai Kanjiro's house preserves mingei as a way of living rather than a wall label. The monthly Toji flea market on the 21st is the same economy at a much larger scale — a city of objects spilling through the temple grounds for one day. Buy one piece. Carry it home. Use it.",
    coverImage: "/images/features/slow-hands.jpg",
    kind: "collection",
    tags: ["Craft", "Workshop", "Objects"],
    placeSlugs: [
      "kaikado",
      "tsujiwa-kanaami",
      "kamisoe",
      "kikyori-naito-shoten",
      "aiha",
      "kyoto-hangakan-motomutsuku",
      "mitate-kyoto",
      "kawai-kanjiro-memorial-museum",
      "tessaido",
      "furui-dogu",
      "toji-koboichi",
    ],
  },
  {
    slug: "reading-rooms",
    title: "Reading Rooms",
    subtitle: "読む部屋",
    intro:
      "Books, records, prints — the Kyoto that is read rather than eaten.",
    body:
      "Bookshops that are also tables; a record shop that curates like a small label; galleries and museum-houses where looking slowly is the entire offer. These places share a posture: you stand still, the room begins to speak, and an hour goes elsewhere. Seikosha is a bookshop run like a small editorial — a tight selection of poetry, photography and Kyoto essays, the front table laid out like an argument. 100,000t Aronto is a tiny upstairs counterpart for zines and small-press fiction. Books & Things sets art monographs alongside ceramic objects, the way a real reader shelves them. Meditations is a record shop that doubles as its own ambient/drone label, three flights up. Gallery Kei mounts one or two works at a time and lights them as if they were being read. Sennoku Hakukokan is a small museum of ancient Chinese bronzes, deliberately dim. D&DEPARTMENT lives inside Bukkoji and treats objects as books: prefecture-by-prefecture editorial, slow browsing, a tea on the temple courtyard. Pace these stops one to a half-day; rushing them is the wrong sport.",
    coverImage: "/images/features/reading-rooms.jpg",
    kind: "collection",
    tags: ["Books", "Records", "Galleries"],
    placeSlugs: [
      "seikosha",
      "100000t-aronto",
      "books-and-things",
      "meditations-kyoto",
      "gallery-kei",
      "senoku-hakukokan",
      "d-and-department-kyoto",
    ],
  },
  {
    slug: "counters-unchanged",
    title: "Counters Unchanged",
    subtitle: "変わらぬ席",
    intro:
      "Tables and menus that have barely moved in sixty years.",
    body:
      "Old-school Kyoto eating, read as architecture: the counter itself is the narrative. These are the rooms whose shapes predate fashion — Izuju pressing saba-zushi from a glass case the way Gion has done for generations, Okabashi pouring translucent gold dashi over thin Kyoto-style udon, Kaneyo grilling unagi on the ground floor while the smell does most of the menu work, Toyouke serving tofu as a complete set across from Kitano Tenmangu, Kawamichiya laying cold soba on lacquer in a low-ceilinged wooden room scented with just-boiled dashi. Sukiyaki Kimura builds the pot in front of you at a single small table; Sakai's six-seat counter announces the day's fish without printing it; Taiho's red vinyl seats and sesame-oil smell are why families come back. Included alongside them: Ippodo's tea counter and Daigokuden's wagashi case, because they hold time the same way a counter does. None of these rooms tries to be of-the-moment. They are of every moment, which is more demanding.",
    coverImage: "/images/features/counters-unchanged.jpg",
    kind: "collection",
    tags: ["Old School", "Counter", "Classics"],
    placeSlugs: [
      "izuju",
      "okabashi",
      "kyogoku-kaneyo",
      "kyotofu-toyouke-jaya",
      "kaian-kawamichiya",
      "sukiyaki-kimura",
      "sakai-kyoto",
      "taiho-kyoto",
      "ippodo-kyoto-main-store",
      "daigokuden-rokkaku",
    ],
  },
  {
    slug: "low-lanterns",
    title: "Low Lanterns",
    subtitle: "夜、低く",
    intro:
      "Narrow alleys, narrow voices — Kyoto after dusk.",
    body:
      "A small set of bars and counters where the door is hard to find and the light is harder to photograph. Kyoto after dusk has an inverted geometry — what was a tourist axis at noon becomes a residential network at ten — and these places only exist within that second city. Yanagikoji TAKA is tucked into one of Kyoto's narrowest lanes, lanterns overhead, doors close enough to touch. Bar Licking Chair (technically Rocking Chair) is a small bar whose door is harder to find than its reputation. Masuya is stand-drinking sake from a wall of bottles, a glass handed across, a pickle alongside. Sakaba Ikura Mokuzai is a drinking room hidden inside a working lumber yard — sawdust and grilled-fish smoke at once. SUMI keeps modern bar discipline at a low murmur. Revolution Books reopens its bookshop as a bar after 17:00, drinks beside whatever you pulled off the shelf. Walk slowly between any two of these. The rooms are the city's other shift; they reward an unhurried Tuesday more than a tourist Saturday.",
    coverImage: "/images/features/low-lanterns.jpg",
    kind: "collection",
    tags: ["Bar", "Night", "Alley"],
    placeSlugs: [
      "bar-licking-chair",
      "masuya-saketen",
      "sakaba-ikura-mokuzai",
      "yanagikoji-taka",
      "sumi-kyoto",
      "revolution-books-kyoto",
    ],
  },
  {
    slug: "steam-and-soap",
    title: "Steam & Soap",
    subtitle: "湯の時間",
    intro:
      "Washing the day off in water that has its own architecture.",
    body:
      "Bathing hours are one of the more honest ways to end a Kyoto day, and Funaoka Onsen is the heritage-building sento where the proposition is most obvious: an entrance corridor of carved wood — battle scenes, gods, detail a public bath has no reason to bother with — followed by cypress, electric, herb, and cold baths. Going at 16:00 on a weekday means a bath nearly to yourself. Paired with two stays that understand why bathing matters at the end of a long walking day: Len Kyoto Kawaramachi keeps a design-forward room above a real cafe-bar, central enough that you'll want a long bath after the day's mileage; Gojo Guesthouse keeps an unrenovated machiya with shared baths for a more old-house experience and a budget that fits a longer stop. Read the three together as a small ritual rather than a category — water, room, sleep — and let the day end at the temperature of the bath.",
    coverImage: "/images/features/steam-and-soap.jpg",
    kind: "collection",
    tags: ["Sento", "Stay", "Bath"],
    placeSlugs: [
      "funaoka-onsen",
      "len-kyoto-kawaramachi",
      "gojo-guesthouse-honkan",
    ],
  },
];
