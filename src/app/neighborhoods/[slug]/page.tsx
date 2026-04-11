import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import {
  CompactEditorialCard,
  StandardEditorialCard,
} from "@/components/ui/EditorialCards";
import { Heading } from "@/components/ui/Heading";
import { TagList } from "@/components/ui/Tag";
import { features } from "@/data/features";
import { neighborhoods } from "@/data/neighborhoods";
import { places } from "@/data/places";
import { selectPlacesForSurface } from "@/lib/place-display-selectors";
import type { Place } from "@/types/place";

export async function generateStaticParams() {
  return neighborhoods.map((neighborhood) => ({ slug: neighborhood.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = neighborhoods.find((item) => item.slug === slug);
  if (!neighborhood) return {};

  return {
    title: neighborhood.name,
    description: neighborhood.intro.slice(0, 160),
  };
}

function selectAnchorPlaces(
  areaPlaces: Place[],
  preferredAnchorSlugs?: string[],
): Place[] {
  const anchorCandidates = selectPlacesForSurface(
    areaPlaces,
    "neighborhood_anchor",
  );
  const preferredSet = new Set(preferredAnchorSlugs ?? []);
  const ranked = [
    ...anchorCandidates.filter((place) => preferredSet.has(place.slug)),
    ...anchorCandidates
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

  return ranked.filter((place) => {
    if (seen.has(place.slug)) return false;
    seen.add(place.slug);
    return true;
  }).slice(0, 3);
}

function rhythmHint(index: number, place: Place): string {
  const categories = place.category;

  if (index === 0) {
    if (categories.includes("Cafe") || categories.includes("Bakery")) {
      return "Start gently with a coffee-or-bakery stop before the area gets busy.";
    }
    return "Start here to set the tone before roaming further.";
  }

  if (index === 1) {
    if (categories.includes("Temple") || categories.includes("Garden") || categories.includes("Museum")) {
      return "Use this as the slower middle stretch, then continue on foot.";
    }
    return "Use this as the midpoint anchor, then leave room for detours.";
  }

  return "Finish with an unhurried stop, then decide whether to continue or reset.";
}

function PlaceCard({
  slug,
  title,
  titleJa,
  category,
  excerpt,
  topPick,
  heroImage,
}: {
  slug: string;
  title: string;
  titleJa?: string;
  category: string[];
  excerpt: string;
  topPick: boolean;
  heroImage: string;
}) {
  return (
    <Link
      href={`/places/${slug}`}
      className="group flex gap-5 border border-border/80 bg-background/92 p-5 transition-colors hover:border-foreground/20 overflow-hidden"
    >
      <div className="relative shrink-0 overflow-hidden h-20 w-20">
        <SmartImage
          src={heroImage}
          alt={title}
          fallbackLabel={category[0]}
          className="h-20 w-20"
          imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {topPick && (
          <span className="absolute top-1.5 left-1.5 label-xs bg-foreground text-primary-foreground px-1.5 py-0.5">
            ★
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5 min-w-0">
        <TagList tags={category} variant="category" size="sm" />
        <div className="editorial-rule max-w-14" />
        <div>
          <p className="font-serif text-base leading-snug text-foreground group-hover:opacity-70 transition-opacity truncate">
            {title}
          </p>
          {titleJa && (
            <p className="font-sans text-xs text-muted-foreground/50 mt-0.5">
              {titleJa}
            </p>
          )}
        </div>
        <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      </div>

      <span className="shrink-0 self-center font-sans text-xs text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 transition-all ml-auto pl-2">
        →
      </span>
    </Link>
  );
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const neighborhood = neighborhoods.find((item) => item.slug === slug);
  if (!neighborhood) notFound();

  const placeBySlug = new Map(places.map((place) => [place.slug, place]));
  const neighborhoodPlaces = neighborhood.placeSlugs
    .map((placeSlug) => placeBySlug.get(placeSlug))
    .filter((place): place is Place => Boolean(place));

  const visibleNeighborhoodPlaces = selectPlacesForSurface(
    neighborhoodPlaces,
    "all_places",
  );
  const anchorPlaces = selectAnchorPlaces(
    visibleNeighborhoodPlaces,
    neighborhood.anchorPlaceSlugs,
  );
  const anchorSlugSet = new Set(anchorPlaces.map((place) => place.slug));
  const browseFurtherPlaces = selectPlacesForSurface(
    visibleNeighborhoodPlaces,
    "neighborhood_anchor",
  )
    .filter((place) => !anchorSlugSet.has(place.slug))
    .slice(0, 4);
  const isThinAreaGuide =
    !neighborhood.halfDayRoute &&
    anchorPlaces.length < 2 &&
    browseFurtherPlaces.length < 2;
  const anchorGridClass =
    anchorPlaces.length <= 1
      ? "md:grid-cols-1 max-w-md"
      : anchorPlaces.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";
  const visiblePlaceSlugSet = new Set(
    visibleNeighborhoodPlaces.map((place) => place.slug),
  );

  const relatedFeatures = features
    .map((feature) => ({
      ...feature,
      overlap: feature.placeSlugs.filter((placeSlug) =>
        visiblePlaceSlugSet.has(placeSlug),
      ).length,
    }))
    .filter((feature) => feature.overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      if ((a.kind === "route") !== (b.kind === "route")) {
        return a.kind === "route" ? -1 : 1;
      }
      return a.title.localeCompare(b.title);
    })
    .slice(0, 4);

  return (
    <div className="pb-24">
      <section className="section-paper border-b border-border py-16 md:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2">
            <Link
              href="/neighborhoods"
              className="font-sans text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Neighborhoods
            </Link>
            <span className="text-border font-sans text-xs">/</span>
            <span className="font-sans text-xs tracking-[0.1em] uppercase text-foreground/60">
              {neighborhood.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20">
            <div>
              <p className="editorial-kicker mb-4">Area guide</p>
              <div className="editorial-rule mb-6 max-w-44" />
              <Heading as="h1" size="xl" font="serif" className="mb-3 text-balance">
                {neighborhood.name}
              </Heading>
              {neighborhood.nameJa && (
                <p className="font-sans text-sm tracking-widest text-muted-foreground/60 mb-7">
                  {neighborhood.nameJa}
                </p>
              )}

              <p className="font-sans text-base leading-[1.9] text-muted-foreground max-w-3xl">
                {neighborhood.intro}
              </p>
              <p className="editorial-standfirst mt-8 max-w-3xl">
                Start with a few anchors, then let walking distance decide the rest.
              </p>

              {(neighborhood.bestFor && neighborhood.bestFor.length > 0) || neighborhood.whenToGo ? (
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {neighborhood.bestFor && neighborhood.bestFor.length > 0 && (
                    <div className="border border-border bg-muted/10 p-4">
                      <p className="label-xs text-muted-foreground/60 mb-2">Best for</p>
                      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                        {neighborhood.bestFor.join(" · ")}
                      </p>
                    </div>
                  )}
                  {neighborhood.whenToGo && (
                    <div className="border border-border bg-muted/10 p-4">
                      <p className="label-xs text-muted-foreground/60 mb-2">When it works best</p>
                      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                        {neighborhood.whenToGo}
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            <div className="note-panel flex flex-col gap-3 p-6">
              <p className="editorial-kicker text-current/70">Area notes</p>
              <div className="editorial-rule max-w-20 bg-current/25 after:bg-current/60" />
              {neighborhood.ambiance && neighborhood.ambiance.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {neighborhood.ambiance.map((word) => (
                    <span
                      key={word}
                      className="font-sans text-xs border border-border px-3 py-1 text-muted-foreground tracking-wide"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              )}
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                Start with {anchorPlaces.length > 0 ? `${anchorPlaces.length} anchor` : "the"} place
                {anchorPlaces.length === 1 ? "" : "s"}, then browse the rest loosely on foot.
              </p>
              <p className="font-sans text-xs text-muted-foreground/60 pt-2">
                {visibleNeighborhoodPlaces.length} visible places in this area
              </p>
              {isThinAreaGuide && (
                <p className="font-sans text-xs leading-relaxed text-muted-foreground/60">
                  This page is intentionally compact for now; richer routing notes can be added as
                  coverage grows.
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      <Container className="mt-1 mb-0">
        <SmartImage
          src={neighborhood.heroImage ?? "/images/neighborhoods/placeholder.jpg"}
          alt={neighborhood.name}
          fallbackLabel={`${neighborhood.name} — overview`}
          className="w-full aspect-[21/9]"
          imgClassName="object-cover"
          priority
        />
      </Container>

      <Container className="mt-14">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20 items-start">
          <div className="flex flex-col gap-14">
            {anchorPlaces.length > 0 && (
              <section>
                <div className="mb-7">
                  <p className="editorial-kicker mb-3">Anchor places</p>
                  <div className="editorial-rule mb-5 max-w-40" />
                  <Heading as="h2" size="md" font="serif" className="mb-3">
                    Start with these places
                  </Heading>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    These are the strongest stops in this area right now (hero or standard tier).
                  </p>
                </div>

                <div className={`grid grid-cols-1 gap-4 ${anchorGridClass}`}>
                  {anchorPlaces.map((place, index) => (
                    <StandardEditorialCard
                      key={place.slug}
                      href={`/places/${place.slug}`}
                      title={place.title}
                      excerpt={place.excerpt}
                      image={place.heroImage}
                      eyebrow={place.topPick ? "Top anchor" : place.category[0] ?? "Anchor"}
                      footer={rhythmHint(index, place)}
                      tone="warm"
                    />
                  ))}
                </div>
              </section>
            )}

            {(neighborhood.halfDayRoute || anchorPlaces.length >= 2) && (
              <section className="section-warm border border-border p-7 md:p-8 flex flex-col gap-6">
                <div>
                  <p className="editorial-kicker mb-3">Suggested half-day rhythm</p>
                  <div className="editorial-rule mb-5 max-w-44" />
                  <Heading as="h2" size="sm" font="serif">
                    A loose way to move through {neighborhood.name}
                  </Heading>
                </div>

                {neighborhood.halfDayRoute && (
                  <p className="font-sans text-sm leading-[1.85] text-muted-foreground">
                    {neighborhood.halfDayRoute}
                  </p>
                )}

                {!neighborhood.halfDayRoute && anchorPlaces.length >= 2 && (
                  <p className="font-sans text-sm leading-[1.85] text-muted-foreground">
                    No fixed route is required here. Treat this as a loose sequence and leave space
                    for small detours.
                  </p>
                )}

                {anchorPlaces.length >= 2 && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {anchorPlaces.map((place, index) => (
                      <div key={place.slug} className="border border-border/70 p-4 bg-background/75">
                        <p className="label-xs text-muted-foreground/60 mb-2">{index === 0 ? "Start" : index === 1 ? "Middle" : "Finish"}</p>
                        <p className="font-serif text-base text-foreground mb-2">{place.title}</p>
                        <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                          {rhythmHint(index, place)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="font-sans text-[0.68rem] text-muted-foreground/50 tracking-wide">
                  This is a rhythm suggestion, not a strict itinerary.
                </p>
              </section>
            )}

            {browseFurtherPlaces.length > 0 && (
              <section>
                <div className="mb-6">
                  <p className="editorial-kicker mb-2">Worth browsing further</p>
                  <div className="editorial-rule mb-4 max-w-40" />
                  <Heading as="h2" size="sm" font="serif">
                    More places to keep on your radar
                  </Heading>
                </div>
                <div className="reference-shelf grid grid-cols-1 gap-3 p-4 md:grid-cols-2">
                  {browseFurtherPlaces.map((place) => (
                    <CompactEditorialCard
                      key={place.slug}
                      href={`/places/${place.slug}`}
                      title={place.title}
                      excerpt={place.excerpt}
                      image={place.heroImage}
                      eyebrow={place.category[0] ?? "Place"}
                    />
                  ))}
                </div>
              </section>
            )}

            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="editorial-kicker mb-2">Full list</p>
                  <div className="editorial-rule mb-4 max-w-36" />
                  <Heading as="h2" size="md" font="serif">
                    Places in {neighborhood.name}
                  </Heading>
                </div>
                <Link
                  href="/places"
                  className="font-sans text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  All places →
                </Link>
              </div>

              {visibleNeighborhoodPlaces.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {visibleNeighborhoodPlaces.map((place) => (
                    <PlaceCard key={place.slug} {...place} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3 border border-dashed border-border p-10 text-center">
                  <p className="font-serif text-lg text-muted-foreground">
                    No places are linked to this neighborhood yet.
                  </p>
                  <p className="font-sans text-sm text-muted-foreground/60">
                    Check the full place index for nearby entries.
                  </p>
                  <Link
                    href="/places"
                    className="mt-2 font-sans text-xs tracking-[0.12em] uppercase text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                  >
                    Browse all places
                  </Link>
                </div>
              )}
            </section>
          </div>

          <aside className="flex flex-col gap-8 lg:sticky lg:top-20">
            {relatedFeatures.length > 0 && (
              <div className="border border-border p-7 flex flex-col gap-4">
                <p className="label-xs text-muted-foreground/60">Related routes & features</p>
                <div className="flex flex-col gap-2">
                  {relatedFeatures.map((feature) => (
                    <Link
                      key={feature.slug}
                      href={`/features/${feature.slug}`}
                      className="group flex items-start justify-between gap-4 py-2 border-b border-border/50 last:border-0"
                    >
                      <div>
                        <p className="font-sans text-sm text-foreground group-hover:opacity-70 transition-opacity leading-relaxed">
                          {feature.title}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground/50 mt-1">
                          {feature.kind === "route" ? "Route" : feature.kind === "essay" ? "Essay" : "Collection"} · {feature.overlap} shared places
                        </p>
                      </div>
                      <span className="font-sans text-xs text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 transition-all">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/features"
                  className="font-sans text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors mt-1"
                >
                  All features →
                </Link>
              </div>
            )}

            <div className="border border-border p-7 flex flex-col gap-4">
              <p className="label-xs text-muted-foreground/60">On the map</p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Use map view when you want to cluster stops by walking distance.
              </p>
              <Link
                href="/map"
                className="inline-flex h-9 items-center border border-border px-5 font-sans text-[0.68rem] tracking-[0.12em] uppercase text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors"
              >
                Open location guide →
              </Link>
            </div>

            <div className="border border-border p-7 flex flex-col gap-4">
              <p className="label-xs text-muted-foreground/60">Other areas</p>
              <div className="flex flex-col gap-2">
                {neighborhoods
                  .filter((item) => item.slug !== slug)
                  .slice(0, 4)
                  .map((item) => (
                    <Link
                      key={item.slug}
                      href={`/neighborhoods/${item.slug}`}
                      className="group flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                    >
                      <div>
                        <p className="font-sans text-sm text-foreground group-hover:opacity-60 transition-opacity">
                          {item.name}
                        </p>
                        {item.nameJa && (
                          <p className="font-sans text-xs text-muted-foreground/40">
                            {item.nameJa}
                          </p>
                        )}
                      </div>
                      <span className="font-sans text-xs text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 transition-all">
                        →
                      </span>
                    </Link>
                  ))}
              </div>
              <Link
                href="/neighborhoods"
                className="font-sans text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors mt-1"
              >
                All neighborhoods →
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
