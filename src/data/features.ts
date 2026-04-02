import type { Feature } from "@/types/feature";

export const features: Feature[] = [
  {
    slug: "kyoto-coffee-doughnuts",
    title: "Kyoto Coffee & Doughnuts",
    subtitle: "The slow morning circuit",
    intro:
      "Kyoto's coffee culture runs on restraint. The best places keep the menus short, the light good, and the pacing entirely their own. These are the spots worth building a morning around.",
    coverImage: "/images/features/kyoto-coffee-doughnuts.jpg",
    placeSlugs: ["weekenders-coffee", "inoda-coffee", "le-petit-mec"],
  },
  {
    slug: "bookstores-old-shops",
    title: "Bookstores & Old Shops",
    subtitle: "Shelves worth getting lost in",
    intro:
      "Between Ichijoji and Demachiyanagi, a loose cluster of independent bookshops, craft stores, and old-goods dealers that resist easy categorisation. Bring a tote bag and no fixed schedule.",
    coverImage: "/images/features/bookstores-old-shops.jpg",
    placeSlugs: ["keibunsha", "coto-books", "ichijoji-used-books"],
  },
  {
    slug: "quiet-corners",
    title: "Quiet Corners of Kyoto",
    subtitle: "Away from the circuit",
    intro:
      "Not hidden — just unhurried. These are the places where the city slows down and remembers its own rhythm. A temple side street, a canal-facing café, a garden with nobody else in it.",
    coverImage: "/images/features/quiet-corners.jpg",
    placeSlugs: [
      "wife-and-husband",
      "sayama-cafe",
      "sarasa-nishijin",
      "hiiragi-ya",
    ],
  },
  {
    slug: "kyoto-chinese-western",
    title: "Chinese & Western Comfort Food",
    subtitle: "The other side of the table",
    intro:
      "Kyoto's reputation rests on kaiseki and tofu, but the city has always had a parallel appetite — for ramen that leans Chinese, for yoshoku that dates back to Meiji, for the kind of meal that asks nothing of you.",
    coverImage: "/images/features/kyoto-chinese-western.jpg",
    placeSlugs: ["chan-mishima", "kichi-kichi"],
  },
  {
    slug: "day-by-kamo-river",
    title: "A Day by the Kamo River",
    subtitle: "A loose itinerary for the riverside",
    intro:
      "The Kamogawa is not a destination. It is the thing you keep returning to between other things — a morning coffee on the bank, a long afternoon walk from Demachiyanagi south, a place to sit when nowhere else feels right.",
    coverImage: "/images/features/day-by-kamo-river.jpg",
    placeSlugs: ["kamo-river-walk", "weekenders-coffee", "wife-and-husband"],
  },
];
