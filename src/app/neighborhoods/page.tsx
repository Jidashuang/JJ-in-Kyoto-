import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import {
  CompactEditorialCard,
  LeadEditorialCard,
  StandardEditorialCard,
  TextNoteCard,
} from "@/components/ui/EditorialCards";
import { features } from "@/data/features";
import { neighborhoods } from "@/data/neighborhoods";
import { places } from "@/data/places";
import { selectPlacesForSurface } from "@/lib/place-display-selectors";
import type { Neighborhood } from "@/types/neighborhood";
import type { Place } from "@/types/place";

export const metadata: Metadata = {
  title: "Neighborhoods",
  description:
    "Half-day Kyoto area guides focused on neighborhood character, pace, and anchors.",
};

function findRelatedFeature(placeSlugs: string[]) {
  let related: { slug: string; title: string } | undefined;
  let maxOverlap = 0;

  for (const feature of features) {
    const overlap = feature.placeSlugs.filter((slug) =>
      placeSlugs.includes(slug),
    ).length;

    if (overlap > maxOverlap) {
      maxOverlap = overlap;
      related = { slug: feature.slug, title: feature.title };
    }
  }

  return related;
}

function selectNeighborhoodAnchors(
  neighborhood: Neighborhood,
  placeBySlug: Map<string, Place>,
): Place[] {
  const areaPlaces = selectPlacesForSurface(
    neighborhood.placeSlugs
      .map((placeSlug) => placeBySlug.get(placeSlug))
      .filter((place): place is Place => Boolean(place)),
    "all_places",
  );
  const candidates = selectPlacesForSurface(areaPlaces, "neighborhood_anchor");
  const preferredSet = new Set(neighborhood.anchorPlaceSlugs ?? []);
  const ranked = [
    ...candidates.filter((place) => preferredSet.has(place.slug)),
    ...candidates
      .filter((place) => !preferredSet.has(place.slug))
      .sort((a, b) => {
        if (a.topPick !== b.topPick) return a.topPick ? -1 : 1;
        if (a.displayTier !== b.displayTier) {
          return a.displayTier === "hero" ? -1 : 1;
        }
        return a.title.localeCompare(b.title);
      }),
  ];
  const seen = new Set<string>();

  return ranked
    .filter((place) => {
      if (seen.has(place.slug)) return false;
      seen.add(place.slug);
      return true;
    })
    .slice(0, 3);
}

export default function NeighborhoodsPage() {
  const routeLikeCount = features.filter(
    (feature) => feature.kind === "route",
  ).length;
  const placeBySlug = new Map(places.map((place) => [place.slug, place]));
  const leadNeighborhood = neighborhoods[0];
  const shelfNeighborhoods = neighborhoods.slice(1, 4);
  const indexNeighborhoods = neighborhoods.slice(4);
  const leadAnchors = leadNeighborhood
    ? selectNeighborhoodAnchors(leadNeighborhood, placeBySlug)
    : [];

  return (
    <>
      <section className="section-paper border-b border-border py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-4xl">
              <p className="editorial-kicker mb-4">Half-day area guides</p>
              <div className="editorial-rule mb-8 max-w-56" />
              <Heading as="h1" size="xl" font="serif" className="text-balance">
                Start with area character,
                <br />
                then shape your day.
              </Heading>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground">
                Kyoto changes every few blocks. Each neighborhood page is written as an area guide:
                atmosphere first, anchors second, rhythm third.
              </p>
            </div>

            <TextNoteCard
              title="How to browse"
              body={`${neighborhoods.length} neighborhood guides, plus ${routeLikeCount} optional routes when you want more structure.`}
              href="/features"
              cta="Open routes"
              tone="ink"
            />
          </div>

          {leadNeighborhood && (
            <div className="mt-12">
              <LeadEditorialCard
                href={`/neighborhoods/${leadNeighborhood.slug}`}
                title={leadNeighborhood.name}
                excerpt={leadNeighborhood.intro}
                image={leadNeighborhood.heroImage}
                eyebrow="Lead area"
                footer={
                  leadAnchors.length > 0
                    ? `Anchor places: ${leadAnchors.map((place) => place.title).join(" · ")}`
                    : undefined
                }
              />
            </div>
          )}
        </Container>
      </section>

      {shelfNeighborhoods.length > 0 && (
        <section className="border-b border-border py-14 md:py-16">
          <Container>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="editorial-kicker mb-3">Area shelf</p>
                <div className="editorial-rule mb-6 max-w-44" />
                <Heading as="h2" size="md" font="serif" className="text-balance">
                  Neighborhoods with clear day rhythm.
                </Heading>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {shelfNeighborhoods.map((neighborhood) => {
                const anchors = selectNeighborhoodAnchors(neighborhood, placeBySlug);
                return (
                  <StandardEditorialCard
                    key={neighborhood.slug}
                    href={`/neighborhoods/${neighborhood.slug}`}
                    title={neighborhood.name}
                    excerpt={neighborhood.intro}
                    image={neighborhood.heroImage}
                    eyebrow="Area guide"
                    footer={
                      anchors.length > 0
                        ? `Anchors: ${anchors.map((place) => place.title).join(" · ")}`
                        : undefined
                    }
                    tone="warm"
                  />
                );
              })}
            </div>
          </Container>
        </section>
      )}

      <section className="section-warm border-b border-border py-14 md:py-16">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="editorial-kicker mb-3">Area index</p>
              <div className="editorial-rule mb-6 max-w-48" />
              <Heading as="h2" size="md" font="serif">
                Full area guide index.
              </Heading>
            </div>
            <Link
              href="/map"
              className="font-sans text-xs tracking-[0.1em] uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              Open area guide map →
            </Link>
          </div>

          <div className="space-y-3">
            {indexNeighborhoods.map((neighborhood) => {
              const relatedFeature = findRelatedFeature(neighborhood.placeSlugs);
              const anchors = selectNeighborhoodAnchors(neighborhood, placeBySlug);
              const tone = neighborhood.ambiance?.slice(0, 3).join(" · ");
              const compact = anchors.length < 2 && !neighborhood.halfDayRoute;

              return (
                <article
                  key={neighborhood.slug}
                  className="grid gap-5 border border-border bg-background p-5 md:grid-cols-[minmax(0,1fr)_260px] md:items-start md:p-6"
                >
                  <div>
                    <div className="mb-3 flex flex-wrap items-end gap-3">
                      <Heading as="h3" size="sm" font="serif">
                        {neighborhood.name}
                      </Heading>
                      {neighborhood.nameJa && (
                        <p className="font-sans text-xs tracking-wider text-muted-foreground/50">
                          {neighborhood.nameJa}
                        </p>
                      )}
                    </div>

                    <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                      {neighborhood.intro}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground/70 leading-relaxed">
                      {tone && <p>Area character: {tone}</p>}
                      {neighborhood.bestFor && neighborhood.bestFor.length > 0 && (
                        <p>Best for: {neighborhood.bestFor.join(" · ")}</p>
                      )}
                      {neighborhood.whenToGo && <p>When to go: {neighborhood.whenToGo}</p>}
                    </div>

                    {anchors.length > 0 && (
                      <div className="mt-4 border-l border-border/70 pl-4">
                        <p className="font-sans text-xs text-muted-foreground/60">
                          Anchor places
                        </p>
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                          {anchors.map((place) => (
                            <Link
                              key={place.slug}
                              href={`/places/${place.slug}`}
                              className="font-sans text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                            >
                              {place.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border/70 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                    <p className="font-sans text-xs text-muted-foreground/60">
                      {compact
                        ? "Compact guide for now; browse full place list inside."
                        : neighborhood.halfDayRoute
                          ? "Includes a suggested half-day rhythm."
                          : "Built for flexible, area-first wandering."}
                    </p>
                    {relatedFeature && (
                      <Link
                        href={`/features/${relatedFeature.slug}`}
                        className="mt-3 block font-sans text-xs leading-relaxed text-muted-foreground underline underline-offset-4 hover:text-foreground"
                      >
                        Pair with: {relatedFeature.title}
                      </Link>
                    )}
                    <Link
                      href={`/neighborhoods/${neighborhood.slug}`}
                      className="mt-5 inline-flex h-10 items-center border border-border px-4 font-sans text-[0.68rem] tracking-[0.12em] uppercase text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
                    >
                      Explore area →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-14">
        <Container>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {neighborhoods.slice(0, 6).map((neighborhood) => (
              <CompactEditorialCard
                key={neighborhood.slug}
                href={`/neighborhoods/${neighborhood.slug}`}
                title={neighborhood.name}
                excerpt={neighborhood.intro}
                image={neighborhood.heroImage}
                eyebrow="Quick jump"
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
