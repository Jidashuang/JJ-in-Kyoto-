import type { Neighborhood } from "@/types/neighborhood";

export const neighborhoods: Neighborhood[] = [
  {
    slug: "demachiyanagi",
    name: "Demachiyanagi",
    nameJa: "出町柳",
    intro:
      "At the confluence of the Kamo and Takano rivers, Demachiyanagi carries the unhurried rhythm of a neighbourhood that has never needed to advertise itself. The covered arcade, the morning market, the small kissaten — it runs at its own pace and rewards those willing to slow down.",
    heroImage: "/images/neighborhoods/demachiyanagi.jpg",
    ambiance: ["Riverside", "Local", "Quiet"],
    halfDayRoute:
      "Start at the morning market by the Tadasu no Mori approach, then walk south along the Kamo. Stop at a coffee stand before browsing the second-hand bookshops near the station. End at the riverbank with something from the nearby bakery.",
    placeSlugs: ["hiiragi-ya", "sayama-cafe", "coto-books"],
  },
  {
    slug: "kawaramachi",
    name: "Kawaramachi",
    nameJa: "河原町",
    intro:
      "Kyoto's main commercial corridor runs noisier and brighter than the rest of the city, but look one alley deep and the texture changes completely. Machiya fronts, narrow passages, and coffee stands doing things quietly — the best of Kawaramachi is always one turn off the main street.",
    heroImage: "/images/neighborhoods/kawaramachi.jpg",
    ambiance: ["Central", "Walkable", "Layered"],
    halfDayRoute:
      "Begin on Shijo-dori in the morning before the crowds arrive. Cut through Nishiki market slowly. Head north through the covered arcade and duck into the side streets around Sanjo. Find a machiya cafe for a late-morning sit-down.",
    placeSlugs: [
      "weekenders-coffee",
      "inoda-coffee",
      "nishiki-market",
      "le-petit-mec",
      "kawamichiya-soba",
      "kichi-kichi",
    ],
  },
  {
    slug: "ichijoji",
    name: "Ichijoji",
    nameJa: "一乗寺",
    intro:
      "Ramen alley is the famous thing, but Ichijoji's real character is its concentration of independent bookshops, small galleries, and carefully considered retail. Take the Eizan line one stop north and give it a half-day — it will earn the detour.",
    heroImage: "/images/neighborhoods/ichijoji.jpg",
    ambiance: ["Bookish", "Neighbourhood", "Unhurried"],
    halfDayRoute:
      "Arrive mid-morning and head straight to Keibunsha to orient yourself. Walk north to the antique cluster, then circle back via the small parks. Finish with ramen only if you must — the neighbourhood has quieter rewards.",
    placeSlugs: ["keibunsha", "ichijoji-used-books"],
  },
  {
    slug: "okazaki",
    name: "Okazaki",
    nameJa: "岡崎",
    intro:
      "Museum row and Heian Jingu give Okazaki a wide-boulevard formality, but the canal-side paths and the residential streets nearby carry a very different register. In spring the cherry blossoms along the canal make a convincing case for arriving early and staying late.",
    heroImage: "/images/neighborhoods/okazaki.jpg",
    ambiance: ["Cultural", "Green", "Spacious"],
    halfDayRoute:
      "Walk the canal path from Okazaki-dori north toward the Shoren-in approach. Visit one museum with intention rather than all of them superficially. Eat lunch at one of the small places on the side streets east of Heian Jingu.",
    placeSlugs: ["omen-okazaki", "philosopher-path"],
  },
  {
    slug: "nishijin",
    name: "Nishijin",
    nameJa: "西陣",
    intro:
      "The old weaving district sits largely unchanged in structure, with machiya townhouses packed tight along narrow lanes. The sound of looms was once constant here; now it is quieter, but the craft culture persists in small workshops, textile shops, and the particular unhurriedness of a neighbourhood that works with its hands.",
    heroImage: "/images/neighborhoods/nishijin.jpg",
    ambiance: ["Craft", "Historic", "Intimate"],
    halfDayRoute:
      "Enter from the south near Imadegawa and walk the grid slowly. Look for the noren curtains that mark open workshops. The Nishijin Textile Center is useful context before or after wandering. Allow time to get genuinely lost.",
    placeSlugs: ["sarasa-nishijin", "wife-and-husband", "chan-mishima"],
  },
  {
    slug: "kamogawa",
    name: "Kamogawa",
    nameJa: "鴨川",
    intro:
      "The Kamo River is less a neighbourhood than a frame — the north-south axis that organises the city's relationship with itself. The banks are public, unhurried, and used all day by people who have nowhere else they need to be.",
    heroImage: "/images/neighborhoods/kamogawa.jpg",
    ambiance: ["Riverside", "Open", "Seasonal"],
    halfDayRoute:
      "Begin at the Demachiyanagi stepping stones in the morning. Walk south along the west bank, taking the unpaved path when it offers itself. Stop where you like. The whole route to Shijo takes under an hour; with stops, it takes as long as you need.",
    placeSlugs: ["kamo-river-walk"],
  },
];
