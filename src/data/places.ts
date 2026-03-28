import type { Place } from "@/types/place";

export const places: Place[] = [
  // ─── 1 ───────────────────────────────────────────────────────────────────
  {
    slug: "weekenders-coffee",
    title: "Weekenders Coffee",
    titleJa: "ウィークエンダーズコーヒー",
    category: ["Cafe"],
    neighborhood: "kawaramachi",
    address: "520 Tominagacho, Shimogyo Ward, Kyoto",
    hours: "7:30–18:00, closed Tue",
    price: "¥500–800",
    website: "https://weekenderscoffee.com",
    tags: ["Top Pick", "Morning", "Quiet"],
    excerpt:
      "A small, unhurried coffee stand in a Taisho-era machiya. The single-origin pour-overs are exceptional, and the space has a stillness that is rare in a city centre.",
    body: "Tucked into a narrow alley off Kawaramachi, Weekenders Coffee occupies a converted machiya townhouse that feels entirely appropriate for a slow morning. The menu is focused — coffee done carefully, nothing extraneous. Order at the counter and find a spot on the narrow bench outside if the weather allows. The morning light through the old wooden lattice is worth arriving early for.",
    heroImage: "/images/places/weekenders-coffee.jpg",
    featured: true,
    topPick: true,
    sourceFeature: "kyoto-coffee-doughnuts",
    sourcePages: "p.12–14",
    verification: { source: "pdf", status: "unverified" },
  },

  // ─── 2 ───────────────────────────────────────────────────────────────────
  {
    slug: "keibunsha",
    title: "Keibunsha",
    titleJa: "恵文社一乗寺店",
    category: ["Bookstore", "Lifestyle"],
    neighborhood: "ichijoji",
    address: "10 Ichijoji Hanatanecho, Sakyo Ward, Kyoto",
    hours: "10:00–20:00",
    website: "https://keibunsha-books.com",
    tags: ["Top Pick", "Classic", "Design Lover"],
    excerpt:
      "The standard reference for Kyoto's independent bookstore culture. The curation is precise — art, design, literature, and the quietly unconventional.",
    body: "Keibunsha has been the compass for Kyoto's bibliophile subculture since the 1980s. The shelves feel hand-selected rather than stocked. Travel, design, craft, and fiction coexist without hierarchy. The attached Leben space hosts exhibitions that match the shop's sensibility. Budget an hour minimum — you will find things you did not know you were looking for.",
    heroImage: "/images/places/keibunsha.jpg",
    featured: true,
    topPick: true,
    sourceFeature: "bookstores-old-shops",
    sourcePages: "p.22",
    verification: { source: "pdf", status: "unverified" },
  },

  // ─── 3 ───────────────────────────────────────────────────────────────────
  {
    slug: "sarasa-nishijin",
    title: "Sarasa Nishijin",
    titleJa: "さらさ西陣",
    category: ["Cafe"],
    neighborhood: "nishijin",
    address: "569-7 Funaokecho, Kita Ward, Kyoto",
    hours: "12:00–22:00, closed Wed",
    tags: ["Classic", "Local Favorite", "Design Lover"],
    excerpt:
      "A beloved cafe inside a converted Meiji-era sento — the original tile work and bathing fixtures are still intact. Coffee and curry, in a space that earns its own pilgrimage.",
    body: "The building itself is the reason to come. A former public bathhouse converted into a cafe, Sarasa Nishijin preserves the zelkova-tile murals, the deep tubs now filled with potted plants, and the vaulted wooden ceiling unchanged. The coffee is honest; the curry is a fixture. Come on a weekday afternoon when it is quiet enough to hear the building.",
    heroImage: "/images/places/sarasa-nishijin.jpg",
    featured: true,
    topPick: false,
    sourceFeature: "quiet-corners",
    verification: { source: "pdf", status: "unverified" },
  },

  // ─── 4 ───────────────────────────────────────────────────────────────────
  {
    slug: "hiiragi-ya",
    title: "Hiiragi-ya Sweets",
    titleJa: "柊家菓子",
    category: ["Sweets", "Japanese"],
    neighborhood: "demachiyanagi",
    address: "Kamigyo Ward, Kyoto",
    hours: "10:00–18:00, closed Mon",
    price: "¥400–900",
    tags: ["Morning", "Quiet", "Solo Friendly"],
    excerpt:
      "A small wagashi counter near Demachiyanagi that takes seasonal ingredients seriously. The warabi mochi in summer and the chestnut yokan in autumn are the things to order.",
    body: "Understated to the point of invisibility from the street — a small curtain, a hand-lettered sign. Inside, a counter with a few stools and a rotating selection of house-made wagashi. No frills, no Instagram set-ups. The owner works alone and the pace is his. It rewards patience and a willingness to point at what looks good.",
    heroImage: "/images/places/hiiragi-ya.jpg",
    featured: false,
    topPick: false,
    sourceFeature: "quiet-corners",
    verification: { source: "pdf", status: "unverified" },
  },

  // ─── 5 ───────────────────────────────────────────────────────────────────
  {
    slug: "kamo-river-walk",
    title: "Kamo River — Demachiyanagi to Shijo",
    titleJa: "鴨川 出町柳〜四条",
    category: ["Walk", "Scenic Spot"],
    neighborhood: "kamogawa",
    tags: ["Top Pick", "Classic", "Morning", "Solo Friendly"],
    excerpt:
      "The central axis of Kyoto on foot. The walking path along the west bank from Demachiyanagi south to Shijo passes herons, couples, and a city that has not quite decided what century it is in.",
    body: "Start at the stepping stones near Demachiyanagi Station and walk south. The path is unpaved and wide. Herons stand still in the shallows. In the evening, university students and young couples sit at equal intervals along the bank — an informal but strictly observed spatial convention. The walk takes forty minutes without stopping. With stops, an afternoon.",
    heroImage: "/images/places/kamo-river-walk.jpg",
    featured: false,
    topPick: true,
    sourceFeature: "day-by-kamo-river",
    verification: { source: "pdf", status: "unverified" },
  },

  // ─── 6 ───────────────────────────────────────────────────────────────────
  {
    slug: "wife-and-husband",
    title: "Wife and Husband",
    titleJa: "ワイフアンドハズバンド",
    category: ["Cafe"],
    neighborhood: "nishijin",
    address: "29 Ohinatacho, Kita Ward, Kyoto",
    hours: "11:00–18:00, closed Sun–Mon",
    price: "¥600–900",
    tags: ["Quiet", "Local Favorite", "Solo Friendly"],
    excerpt:
      "A small specialty coffee counter in Nishijin, run with characteristic quietness by a husband and wife. The coffee is the point; the space asks you to take your time with it.",
    body: "The name is literal — the shop is run by two people who work in unhurried coordination. The drinks list is short and considered, the interior stripped back to what matters: good light, clean lines, and a coffee bar facing a narrow garden. It sits in a residential lane that rarely sees foot traffic, which keeps things quiet. The kind of place that earns its reputation by word of mouth and asks nothing more.",
    heroImage: "/images/places/wife-and-husband.jpg",
    featured: true,
    topPick: false,
    sourceFeature: "quiet-corners",
    verification: { source: "pdf", status: "unverified" },
  },

  // ─── 7 ───────────────────────────────────────────────────────────────────
  {
    slug: "sayama-cafe",
    title: "Sayama Café",
    titleJa: "さやまカフェ",
    category: ["Cafe"],
    neighborhood: "demachiyanagi",
    address: "Kamigyo Ward, Kyoto",
    hours: "9:00–17:00, closed Mon–Tue",
    price: "¥500–800",
    tags: ["Morning", "Quiet", "Solo Friendly"],
    excerpt:
      "A light-filled morning cafe tucked in a residential block near the market. Coffee and toast done simply, with a counter seat that faces the garden.",
    body: "The sign is easy to miss — a small painted board, a noren, and the smell of good coffee drifting out. The interior is one room, low-ceilinged and warm. Toast comes thick-sliced on a plate with butter on the side; the pour-over takes a few minutes longer than expected, which is the correct approach. The counter seat by the garden window fills first. Arrive early and order without hurrying.",
    heroImage: "/images/places/sayama-cafe.jpg",
    featured: false,
    topPick: false,
    sourceFeature: "quiet-corners",
    verification: { source: "manual", status: "unverified" },
  },

  // ─── 8 ───────────────────────────────────────────────────────────────────
  {
    slug: "coto-books",
    title: "Coto Books",
    titleJa: "コトブックス",
    category: ["Bookstore"],
    neighborhood: "demachiyanagi",
    address: "Kamigyo Ward, Kyoto",
    hours: "12:00–20:00, closed Wed",
    tags: ["Design Lover", "Quiet", "Solo Friendly"],
    excerpt:
      "A compact bookshop near Demachiyanagi with a tight selection of art books, zines, and visual literature. The kind of curation that takes a position.",
    body: "Small enough to survey in five minutes, compelling enough to stay for an hour. The shelves concentrate on photography, art, architecture, and independently published work — the kind of books that get imported rather than distributed. There is usually a rotating table of zines and small-run prints near the entrance. The owner is present and knowledgeable without being intrusive.",
    heroImage: "/images/places/coto-books.jpg",
    featured: false,
    topPick: false,
    sourceFeature: "bookstores-old-shops",
    verification: { source: "manual", status: "unverified" },
  },

  // ─── 9 ───────────────────────────────────────────────────────────────────
  {
    slug: "inoda-coffee",
    title: "Inoda Coffee",
    titleJa: "イノダコーヒ",
    category: ["Cafe"],
    neighborhood: "kawaramachi",
    address: "140 Doshomachi, Nakagyo Ward, Kyoto",
    hours: "7:00–18:00",
    price: "¥700–1200",
    website: "https://www.inoda-coffee.co.jp",
    tags: ["Top Pick", "Classic", "Morning"],
    excerpt:
      "The anchor of Kyoto's old coffee culture. Inoda has been serving the Arabia blend since 1947 — with milk and sugar already added, unless you specify otherwise. Order accordingly.",
    body: "Inoda Coffee is what Kyoto's coffee culture looks like when viewed from the inside rather than the outside. The Sanjo branch is the original — a compound of interconnected rooms with high ceilings, dark wood, and the particular formality of a place that takes its trade seriously. The Arabia blend arrives pre-sweetened by default, a house decision that is older than most of its customers. The morning set (coffee, orange juice, a roll) is the correct order. Arrive before 9:00 if you want a window seat.",
    heroImage: "/images/places/inoda-coffee.jpg",
    featured: true,
    topPick: true,
    sourceFeature: "kyoto-coffee-doughnuts",
    verification: { source: "manual", status: "unverified" },
  },

  // ─── 10 ──────────────────────────────────────────────────────────────────
  {
    slug: "omen-okazaki",
    title: "Omen",
    titleJa: "おめん",
    category: ["Japanese", "Restaurant"],
    neighborhood: "okazaki",
    address: "74 Jodoji Isobecho, Sakyo Ward, Kyoto",
    hours: "11:30–21:00, closed Thu",
    price: "¥1200–1800",
    website: "https://www.omen.co.jp",
    tags: ["Classic", "Local Favorite"],
    excerpt:
      "Thick udon with a cold broth and a side bowl of condiments to add as you go. A Kyoto noodle institution that rewards those who eat without hurry.",
    body: "Omen is the kind of place that does one thing and does it with conviction. The udon — thick, hand-cut, served cold with a broth for dipping — comes with a broad condiment tray: sesame, spring onion, ginger, burdock, and spinach, added in stages as the bowl progresses. The Okazaki branch occupies an old machiya on the canal path near Nanzenji. The lunch queue is regular; arrive at opening or after 13:30.",
    heroImage: "/images/places/omen-okazaki.jpg",
    featured: false,
    topPick: false,
    verification: { source: "manual", status: "unverified" },
  },

  // ─── 11 ──────────────────────────────────────────────────────────────────
  {
    slug: "philosopher-path",
    title: "Philosopher's Path",
    titleJa: "哲学の道",
    category: ["Walk", "Scenic Spot"],
    neighborhood: "okazaki",
    tags: ["Top Pick", "Classic", "Morning", "Solo Friendly"],
    excerpt:
      "A two-kilometre stone path along a canal, lined with cherry trees and backed by the eastern mountains. Quieter than its reputation suggests, if you arrive early enough.",
    body: "The path runs from Ginkakuji south to Nanzenji, tracing a narrow irrigation canal through the residential eastern foothills. In spring the cherry blossoms attract a significant crowd; in every other season it is a straightforward pleasure — a walkable stretch of the city that faces the mountains and allows for stillness. The best section is the northern half, between Ginkakuji and the bridge at Nyakuoji Shrine. Walk south. Enter at Ginkakuji first thing in the morning.",
    heroImage: "/images/places/philosopher-path.jpg",
    featured: false,
    topPick: true,
    verification: { source: "manual", status: "unverified" },
  },

  // ─── 12 ──────────────────────────────────────────────────────────────────
  {
    slug: "le-petit-mec",
    title: "Le Petit Mec",
    titleJa: "ル プチメック",
    category: ["Bakery"],
    neighborhood: "kawaramachi",
    address: "58 Higashiogawacho, Nakagyo Ward, Kyoto",
    hours: "8:00–19:00, closed Mon",
    price: "¥200–600",
    tags: ["Morning", "Classic", "Local Favorite"],
    excerpt:
      "The bakery that set the standard for French bread in Kyoto. Le Petit Mec has been turning out focaccia, croissants, and pain de campagne from a small Nakagyo shopfront since the 1990s.",
    body: "The loaves disappear early. By 9:00 the baguette shelf is already thinning; by noon the croissants are gone. The focaccia is reliably available and reliably excellent — thick crumb, good olive oil, a salty crust. The interior is narrow with a short bench by the window. Most people buy and walk. There is a second branch in Nishijin that sometimes has the pain de campagne when this one does not.",
    heroImage: "/images/places/le-petit-mec.jpg",
    featured: false,
    topPick: false,
    sourceFeature: "kyoto-coffee-doughnuts",
    verification: { source: "manual", status: "unverified" },
  },

  // ─── 13 ──────────────────────────────────────────────────────────────────
  {
    slug: "nishiki-market",
    title: "Nishiki Market",
    titleJa: "錦市場",
    category: ["Walk", "Scenic Spot"],
    neighborhood: "kawaramachi",
    hours: "Most stalls open 9:00–18:00, varies by vendor",
    tags: ["Classic", "Local Favorite", "Morning"],
    excerpt:
      "Kyoto's covered food market has operated on this block for four centuries. The narrow arcade runs east-west for five blocks between Teramachi and Takakura — fish, pickles, tofu, and street food, shoulder to shoulder.",
    body: "Four hundred years of food culture in a single covered lane. The market runs about 400 metres east to west, and each vendor occupies barely more than a large wardrobe. The fish is excellent; the tsukemono are the purchase to make. Arrive before 10:00 for the quietest experience. Midday is relentless, and weekends more so. The western end near Teramachi tends to be less crowded and has a higher ratio of working vendors to souvenir shops.",
    heroImage: "/images/places/nishiki-market.jpg",
    featured: false,
    topPick: false,
    verification: { source: "manual", status: "unverified" },
  },

  // ─── 14 ──────────────────────────────────────────────────────────────────
  {
    slug: "kichi-kichi",
    title: "Kichi Kichi",
    titleJa: "キチキチ",
    category: ["Western", "Restaurant"],
    neighborhood: "kawaramachi",
    address: "Kiyamachi-dori, Nakagyo Ward, Kyoto",
    hours: "18:00–22:00, dinner only — reservations essential",
    price: "¥2500–3500",
    tags: ["Classic", "Local Favorite"],
    excerpt:
      "A small counter restaurant in Kiyamachi, famous for the omurice made tableside — a thin omelette folded around rice pilaf, then slit open at the counter edge. A single dish, performed nightly.",
    body: "The room seats about a dozen people at a U-shaped counter facing the kitchen. The chef works without theatre but with precision: the egg is cooked in a well-seasoned carbon-steel pan, the omelette draped over the rice, then scored and opened at the counter in a single clean motion. There is one dish on the menu, and it arrives in the same form each time. Reservations are essential; the dinner-only schedule and small seating make walk-ins unlikely to succeed.",
    heroImage: "/images/places/kichi-kichi.jpg",
    featured: true,
    topPick: false,
    sourceFeature: "kyoto-chinese-western",
    verification: { source: "manual", status: "unverified" },
  },

  // ─── 15 ──────────────────────────────────────────────────────────────────
  {
    slug: "chan-mishima",
    title: "Chan Mishima",
    titleJa: "チャン三島",
    category: ["Chinese", "Restaurant"],
    neighborhood: "nishijin",
    address: "Kita Ward, Kyoto",
    hours: "11:30–14:00, 18:00–21:00, closed Tue",
    price: "¥900–1800",
    tags: ["Local Favorite", "Casual"],
    excerpt:
      "A small Chinese kitchen in Nishijin, run by a family that has been cooking this way for two generations. The gyoza and the mapo dofu are the standards; everything else changes with the season.",
    body: "Fifteen seats and a kitchen visible over the counter. The gyoza here are thinner-skinned than most in Kyoto — not fully Japanese, not quite Chinese, something specific to this kitchen. The mapo dofu is made with house-ground doubanjiang and arrives reliably hot. The lunch sets are good value; dinner requires either a reservation or patience. A neighbourhood fixture that asks very little of you except showing up.",
    heroImage: "/images/places/chan-mishima.jpg",
    featured: false,
    topPick: false,
    sourceFeature: "kyoto-chinese-western",
    verification: { source: "manual", status: "unverified" },
  },

  // ─── 16 ──────────────────────────────────────────────────────────────────
  {
    slug: "ichijoji-used-books",
    title: "Ichijoji Used Books Alley",
    titleJa: "一乗寺 古書街",
    category: ["Walk", "Bookstore"],
    neighborhood: "ichijoji",
    tags: ["Classic", "Design Lover", "Solo Friendly", "Quiet"],
    excerpt:
      "The loose cluster of second-hand bookshops along the Eizan main street has made Ichijoji one of the few places in Japan where browsing on foot feels like a planned activity.",
    body: "The concentration is mostly on the 200-metre stretch north of Ichijoji Station, and not all the shops advertise themselves prominently. Some are arranged by subject with academic rigour; others are stacked floor to ceiling with no apparent system that reveals itself only to regulars. Manga, art books, academic texts, and out-of-print photography volumes sit within a few paces of each other. The best approach: enter every shop with no list, no time limit, and carry more cash than you expect to spend.",
    heroImage: "/images/places/ichijoji-used-books.jpg",
    featured: false,
    topPick: false,
    sourceFeature: "bookstores-old-shops",
    verification: { source: "manual", status: "unverified" },
  },

  // ─── 17 ──────────────────────────────────────────────────────────────────
  {
    slug: "kawamichiya-soba",
    title: "Kawamichiya",
    titleJa: "河道屋養老",
    category: ["Japanese", "Restaurant"],
    neighborhood: "kawaramachi",
    address: "371 Funatsukacho, Nakagyo Ward, Kyoto",
    hours: "11:00–20:00, closed Thu",
    price: "¥1000–2000",
    tags: ["Top Pick", "Classic", "Local Favorite"],
    excerpt:
      "An Edo-period soba restaurant occupying a machiya in the alleys between Kawaramachi and Fuyacho. The duck soba in winter and the cold seiro in summer are the orders that have not changed in decades.",
    body: "The building dates to the late Edo period and feels it — low beams, tatami side rooms, a small garden visible from the main counter. The soba is made in-house: buckwheat that comes through clean and slightly sweet, the broth restrained and precise. The duck nanban in winter is the signature; the cold seiro in summer serves the noodle better. No rush is ever communicated and none should be felt. Order the minimum, eat slowly, and have a second bowl.",
    heroImage: "/images/places/kawamichiya-soba.jpg",
    featured: false,
    topPick: true,
    verification: { source: "manual", status: "unverified" },
  },
];
