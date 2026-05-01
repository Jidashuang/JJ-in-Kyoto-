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
      "Kissaten is not a cafe genre — it is a way a room holds time. Dim light, thick coffee, upholstery older than most patrons. These six are the places where Kyoto's kissa grammar is still intact: the stairs down, the heavy cup, the calm.",
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
      "Kyoto is read differently from the water level. These are places that only make sense with the river as a co-author: a picnic coffee stand, a deck above moving water, a dango stop at the two-rivers junction. Visit for the sound as much as the seat.",
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
      "The Kyoto of wire mesh, tea canisters, folding fans, bamboo, paper, brushes, and old things worth keeping. What you can take home from these places is not decoration — it is a tool that expects to be used for thirty years. The monthly flea market at Toji is included because it is the same economy at a larger scale.",
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
      "Bookshops that are also tables; a record shop that curates like a small label; galleries and museum-houses where looking slowly is the entire offer. These places share a posture: you stand still and the room begins to speak.",
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
      "Old-school Kyoto eating, read as architecture: the counter itself is the narrative. Udon, tofu, sushi, soba, donburi, sukiyaki — each at a single institution whose shape predates fashion. Included with them: the Ippodo tea room and a wagashi counter, because they hold time the same way.",
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
      "A small set of bars and sake counters where the door is hard to find and the light is harder to photograph. These are places that only exist after sundown: Yanagikoji, Kiyamachi, a basement off Shijo. Go slow, sit longer than you meant to.",
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
      "A sento that doubles as a heritage building, and two small stays that understand why. Optional as a theme, but included because bathing hours are one of the more honest ways to end a Kyoto day.",
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
