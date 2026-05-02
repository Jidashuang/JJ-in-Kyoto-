import { places } from "@/data/places";

/**
 * Moment-based entry points for the homepage.
 *
 * Editorial scenes rather than functional categories — "a drink with the lights
 * low" rather than "Bars". Each moment maps to a small hand-picked list of
 * place slugs from the dataset. Slugs that no longer exist are silently
 * filtered at access time so renaming or deletion doesn't break the page.
 *
 * Add or revise moments here when the editorial framing of the guide shifts;
 * the homepage `<Moments />` component picks them up automatically.
 */

export type Moment = {
  id: string;
  label: string;
  /** A short why/when line, shown beneath the label as muted text. */
  hint: string;
  /** Hand-picked slugs from src/data/places. Order matters — the first listed
   *  is the strongest pick for that moment. */
  placeSlugs: string[];
};

export const MOMENTS: Moment[] = [
  {
    id: "morning-coffee",
    label: "Coffee before anything else",
    hint: "The first hour of the day, before the city is fully awake.",
    placeSlugs: [
      "rokuyosha-basement",
      "inoda-coffee-main-store",
      "smart-coffee",
      "ichikawaya-coffee",
    ],
  },
  {
    id: "river-pause",
    label: "A walk that ends by water",
    hint: "Pick something to take, walk to the Kamo bank, sit.",
    placeSlugs: [
      "wife-and-husband",
      "nakagawa-komugiten",
      "kotoka-kyoto",
      "maruki-seipanjo",
    ],
  },
  {
    id: "reading-hours",
    label: "Reading hours",
    hint: "An afternoon for a book and no plan.",
    placeSlugs: [
      "seikosha",
      "books-and-things",
      "100000t-aronto",
      "kiridoshi-shinshindo",
    ],
  },
  {
    id: "sweets-bench",
    label: "Sweets and a bench",
    hint: "Buy a small sweet, find a spot, eat it within the hour.",
    placeSlugs: ["kotoka-kyoto", "daigokuden-rokkaku", "ippodo-kyoto-main-store"],
  },
  {
    id: "drink-low-light",
    label: "A drink with the lights low",
    hint: "Evening hours, narrow alleys, voices at a murmur.",
    placeSlugs: [
      "yanagikoji-taka",
      "bar-licking-chair",
      "sumi-kyoto",
      "francois-kissaten",
    ],
  },
  {
    id: "hands-on-craft",
    label: "Watch something made by hand",
    hint: "Workshops you can stand in for an hour without buying anything.",
    placeSlugs: [
      "kaikado",
      "tsujiwa-kanaami",
      "aiha",
      "kamisoe",
    ],
  },
  {
    id: "design-loop",
    label: "A design-leaning afternoon",
    hint: "Three stops for objects, paper, and contemporary craft.",
    placeSlugs: ["d-and-department-kyoto", "soil-kyoto", "mitate-kyoto", "bolts-hardware-store"],
  },
  {
    id: "old-kyoto-counter",
    label: "Old Kyoto, at a counter",
    hint: "One seat, one bowl, almost no negotiation with the menu.",
    placeSlugs: ["okabashi", "kyogoku-kaneyo", "izuju", "sakai-kyoto"],
  },
];

/**
 * Resolves a moment's place slugs into the full Place objects, dropping any
 * slug that no longer matches a real place. This keeps the homepage rendering
 * stable when slugs are renamed or removed without an explicit moments update.
 */
export function getMomentPlaces(moment: Moment) {
  const placeBySlug = new Map(places.map((p) => [p.slug, p]));
  return moment.placeSlugs
    .map((slug) => placeBySlug.get(slug))
    .filter((place): place is NonNullable<typeof place> => Boolean(place));
}
