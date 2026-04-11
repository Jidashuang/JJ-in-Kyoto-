import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { TagList } from "@/components/ui/Tag";
import { TextNoteCard } from "@/components/ui/EditorialCards";
import { PLACE_INTENT_GROUPS } from "@/data/place-taxonomy";
import { neighborhoods } from "@/data/neighborhoods";
import { places } from "@/data/places";
import {
  placeVisibleOnSurface,
  selectPlacesForSurface,
} from "@/lib/place-display-selectors";

export const metadata: Metadata = {
  title: "Area Guide",
  description:
    "Browse Kyoto by area with neighborhood intros, anchor places, and top picks from the current guide data.",
};

function titleCaseNeighborhood(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function CountCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="section-paper border border-border px-5 py-5">
      <p className="editorial-kicker mb-2">{label}</p>
      <p className="font-serif text-[clamp(1.8rem,3.6vw,2.8rem)] leading-none text-foreground">
        {value}
      </p>
    </div>
  );
}

const AREA_GROUPS = [
  {
    id: "group-central-and-river",
    label: "Central & River Loop",
    intro:
      "Best for first-time days when you want flexible walking between cafés, classic shops, and riverside breaks.",
    neighborhoodSlugs: ["karasuma-and-downtown", "kamo-river-and-demachiyanagi"],
  },
  {
    id: "group-east-and-culture",
    label: "East Side Classics",
    intro:
      "Historic streets, temples, and museum-friendly routes with strong old-Kyoto atmosphere and slower pacing options.",
    neighborhoodSlugs: ["gion-and-higashiyama", "okazaki-and-marutamachi"],
  },
  {
    id: "group-north-and-south",
    label: "North & South Everyday Kyoto",
    intro:
      "Useful for local rhythm and practical planning, from sento culture and tofu lanes to station-side transitions.",
    neighborhoodSlugs: ["nishijin-and-north-kyoto", "kyoto-station-and-south"],
  },
] as const;

export default function MapPage() {
  const placeBySlug = new Map(places.map((place) => [place.slug, place]));

  const neighborhoodRecords = neighborhoods
    .map((neighborhood) => ({
      ...neighborhood,
      listedPlaces: neighborhood.placeSlugs
        .map((slug) => placeBySlug.get(slug))
        .filter((place): place is (typeof places)[number] => Boolean(place)),
    }))
    .map((neighborhood) => {
      const prominentPlaces = selectPlacesForSurface(
        neighborhood.listedPlaces,
        "neighborhood_anchor",
      );
      const anchorPlaces = (neighborhood.anchorPlaceSlugs ?? [])
        .map((slug) => placeBySlug.get(slug))
        .filter(
          (place): place is (typeof places)[number] =>
            Boolean(place) && placeVisibleOnSurface(place, "neighborhood_anchor"),
        );
      const topPicks = prominentPlaces.filter((place) => place.topPick);

      return {
        ...neighborhood,
        count: neighborhood.listedPlaces.length,
        anchorPlaces:
          anchorPlaces.length > 0
            ? anchorPlaces
            : prominentPlaces.slice(0, 3),
        topPicks: topPicks.length > 0 ? topPicks : prominentPlaces.slice(0, 3),
      };
    })
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const neighborhoodRecordBySlug = new Map(
    neighborhoodRecords.map((neighborhood) => [neighborhood.slug, neighborhood]),
  );

  const placeToNeighborhoodSlug = new Map<string, string>();
  neighborhoodRecords.forEach((neighborhood) => {
    neighborhood.placeSlugs.forEach((slug) => {
      placeToNeighborhoodSlug.set(slug, neighborhood.slug);
    });
  });

  const groupedAreas = AREA_GROUPS.map((group) => {
    const items = group.neighborhoodSlugs
      .map((slug) => neighborhoodRecordBySlug.get(slug))
      .filter(
        (neighborhood): neighborhood is (typeof neighborhoodRecords)[number] =>
          Boolean(neighborhood),
      );
    const placeCount = items.reduce((sum, item) => sum + item.count, 0);
    const topPickCount = items.reduce((sum, item) => sum + item.topPicks.length, 0);

    return {
      ...group,
      items,
      placeCount,
      topPickCount,
    };
  });

  const topPicksByArea = neighborhoodRecords
    .filter((neighborhood) => neighborhood.topPicks.length > 0)
    .sort(
      (a, b) => b.topPicks.length - a.topPicks.length || a.name.localeCompare(b.name),
    );

  const quickEntryByType = PLACE_INTENT_GROUPS.map((intent) => {
    const matchedPlaces = places.filter((place) => {
      if (intent.topPick) return place.topPick;
      const matchesCategory =
        intent.categories?.some((category) => place.category.includes(category)) ??
        false;
      const matchesTag = intent.tags?.some((tag) => place.tags.includes(tag)) ?? false;
      return matchesCategory || matchesTag;
    });

    const areaCount = new Map<string, number>();

    matchedPlaces.forEach((place) => {
      const areaSlug =
        placeToNeighborhoodSlug.get(place.slug) || place.canonicalNeighborhoodSlug;
      if (!areaSlug) return;
      areaCount.set(areaSlug, (areaCount.get(areaSlug) ?? 0) + 1);
    });

    const topAreas = Array.from(areaCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([areaSlug, count]) => {
        const areaName =
          neighborhoodRecordBySlug.get(areaSlug)?.name ||
          titleCaseNeighborhood(areaSlug);
        return `${areaName} (${count})`;
      });

    return {
      id: intent.id,
      label: intent.label,
      matchedPlaces,
      topAreas,
    };
  }).filter((entry) => entry.matchedPlaces.length > 0);

  const quickAreaJump = groupedAreas.flatMap((group) => group.items);
  const topPickCount = places.filter((place) => place.topPick).length;

  return (
    <>
      <section className="section-paper border-b border-border py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="editorial-kicker mb-4">Area guide</p>
              <div className="editorial-rule mb-8 max-w-56" />
              <Heading as="h1" size="xl" font="serif" className="text-balance">
                Browse Kyoto by area,
                <br />
                then decide your pace.
              </Heading>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground">
                This is an editorial map-like index. Use it to choose neighborhood clusters,
                not to optimize every minute.
              </p>
            </div>

            <TextNoteCard
              title="How to read this page"
              body="Pick one area group first, choose 2-3 anchors, and keep route order flexible."
              tone="ink"
            />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            <CountCard label="Area groups" value={groupedAreas.length} />
            <CountCard label="Neighborhoods" value={neighborhoodRecords.length} />
            <CountCard label="Places" value={places.length} />
            <CountCard label="Top picks" value={topPickCount} />
          </div>

          <div className="mt-8 grid gap-6 border border-border section-warm p-6 lg:grid-cols-2">
            <div>
              <p className="editorial-kicker mb-3">Quick jump by group</p>
              <div className="flex flex-wrap gap-2">
                {groupedAreas.map((group) => (
                  <a
                    key={group.id}
                    href={`#${group.id}`}
                    className="inline-flex border border-border bg-background px-3 py-1.5 font-sans text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    {group.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="editorial-kicker mb-3">Quick jump by neighborhood</p>
              <div className="flex flex-wrap gap-2">
                {quickAreaJump.map((neighborhood) => (
                  <a
                    key={neighborhood.slug}
                    href={`#area-${neighborhood.slug}`}
                    className="inline-flex border border-border bg-background px-3 py-1.5 font-sans text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    {neighborhood.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-14 md:py-16">
        <Container>
          <div className="mb-10">
            <p className="editorial-kicker mb-3">Neighborhood groups</p>
            <div className="editorial-rule mb-6 max-w-52" />
            <Heading as="h2" size="lg" font="serif">
              Area-first browsing
            </Heading>
          </div>

          <div className="space-y-12">
            {groupedAreas.map((group, groupIndex) => (
              <section
                key={group.id}
                id={group.id}
                className={`scroll-mt-24 border border-border p-6 md:p-7 ${
                  groupIndex % 2 === 0 ? "bg-background" : "section-warm"
                }`}
              >
                <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="editorial-kicker mb-2">{group.items.length} neighborhoods</p>
                    <Heading as="h3" size="md" font="serif">
                      {group.label}
                    </Heading>
                    <p className="mt-2 max-w-3xl font-sans text-sm leading-relaxed text-muted-foreground">
                      {group.intro}
                    </p>
                  </div>
                </div>

                <p className="mb-6 font-sans text-xs text-muted-foreground/65">
                  {group.placeCount} places · {group.topPickCount} editorial top picks
                </p>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {group.items.map((neighborhood) => (
                    <article
                      key={neighborhood.slug}
                      id={`area-${neighborhood.slug}`}
                      className="flex h-full flex-col gap-4 border border-border bg-background p-5 scroll-mt-24"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Heading as="h4" size="sm" font="serif">
                            {neighborhood.name}
                          </Heading>
                          <p className="mt-1 font-sans text-xs text-muted-foreground/55">
                            {neighborhood.count} places in this area
                          </p>
                        </div>
                        <Link
                          href={`/neighborhoods/${neighborhood.slug}`}
                          className="font-sans text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Open area →
                        </Link>
                      </div>

                      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                        {neighborhood.intro}
                      </p>

                      {neighborhood.anchorPlaces.length > 0 && (
                        <div>
                          <p className="editorial-kicker mb-2">Anchor places</p>
                          <div className="flex flex-wrap gap-2">
                            {neighborhood.anchorPlaces.slice(0, 4).map((place) => (
                              <Link
                                key={place.slug}
                                href={`/places/${place.slug}`}
                                className="inline-flex border border-border px-2.5 py-1 font-sans text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                              >
                                {place.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border/60 pt-3">
                        <p className="font-sans text-xs text-muted-foreground/55">
                          {neighborhood.topPicks.length} top picks
                        </p>
                        {neighborhood.ambiance && neighborhood.ambiance.length > 0 && (
                          <TagList
                            tags={neighborhood.ambiance.slice(0, 2)}
                            variant="outline"
                            size="sm"
                          />
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-warm border-b border-border py-14 md:py-16">
        <Container>
          <div className="mb-8">
            <p className="editorial-kicker mb-3">Top picks by area</p>
            <div className="editorial-rule mb-6 max-w-44" />
            <Heading as="h2" size="md" font="serif">
              Start with standout addresses.
            </Heading>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-8">
              {topPicksByArea.slice(0, 4).map((neighborhood) => (
                <article
                  key={neighborhood.slug}
                  className="grid gap-4 border border-border bg-background p-5 md:grid-cols-[220px_minmax(0,1fr)] md:items-start"
                >
                  <div>
                    <Heading as="h3" size="sm" font="serif">
                      {neighborhood.name}
                    </Heading>
                    <p className="mt-1 font-sans text-xs text-muted-foreground/60">
                      {neighborhood.topPicks.length} picks
                    </p>
                  </div>
                  <div className="space-y-2">
                    {neighborhood.topPicks.slice(0, 4).map((place) => (
                      <Link
                        key={place.slug}
                        href={`/places/${place.slug}`}
                        className="group flex items-center justify-between border border-border/70 px-3 py-2 transition-colors hover:border-foreground/30"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-sans text-sm text-foreground">
                            {place.title}
                          </p>
                          <p className="font-sans text-xs text-muted-foreground/60">
                            {place.category[0]}
                          </p>
                        </div>
                        <span className="font-sans text-xs text-muted-foreground/40 transition-colors group-hover:text-foreground">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:col-span-4">
              <TextNoteCard
                title="Practical tip"
                body="Pick one anchor from this list, then add nearby stops from the same neighborhood page."
                tone="ink"
              />
              {topPicksByArea.slice(4, 7).map((neighborhood) => (
                <Link
                  key={neighborhood.slug}
                  href={`/neighborhoods/${neighborhood.slug}`}
                  className="group border border-border bg-background p-4 transition-colors hover:border-foreground/30"
                >
                  <p className="editorial-kicker mb-2">Area</p>
                  <p className="font-serif text-lg text-foreground transition-opacity group-hover:opacity-75">
                    {neighborhood.name}
                  </p>
                  <p className="mt-2 font-sans text-xs text-muted-foreground/65">
                    {neighborhood.topPicks.length} top picks
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-14 md:py-16">
        <Container>
          <div className="mb-8">
            <p className="editorial-kicker mb-3">Quick entry by type</p>
            <div className="editorial-rule mb-6 max-w-52" />
            <Heading as="h2" size="md" font="serif">
              Choose intention first, then neighborhood.
            </Heading>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {quickEntryByType.map((entry, index) => (
              <article
                key={entry.id}
                className={`flex h-full flex-col gap-4 border border-border p-5 ${
                  index === 0 ? "note-panel" : "section-paper"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <Heading
                    as="h3"
                    size="sm"
                    font="serif"
                    className={index === 0 ? "text-current" : undefined}
                  >
                    {entry.label}
                  </Heading>
                  <p className="font-sans text-xs text-current/70">{entry.matchedPlaces.length}</p>
                </div>

                {entry.topAreas.length > 0 && (
                  <p className="font-sans text-xs leading-relaxed text-current/80">
                    Best areas: {entry.topAreas.join(" · ")}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {entry.matchedPlaces.slice(0, 3).map((place) => (
                    <Link
                      key={place.slug}
                      href={`/places/${place.slug}`}
                      className="inline-flex border border-current/30 px-2.5 py-1 font-sans text-xs text-current/80 transition-colors hover:border-current"
                    >
                      {place.title}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/places"
                  className="mt-auto font-sans text-xs tracking-[0.1em] uppercase text-current/80 transition-colors hover:text-current"
                >
                  Browse full list →
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
