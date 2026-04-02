import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { TagList } from "@/components/ui/Tag";
import { neighborhoods } from "@/data/neighborhoods";
import { places } from "@/data/places";

/* ─── Static params ─────────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

/* ─── Metadata ──────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = neighborhoods.find((n) => n.slug === slug);
  if (!neighborhood) return {};
  return {
    title: neighborhood.name,
    description: neighborhood.intro.slice(0, 160),
  };
}

/* ─── Placeholder image ─────────────────────────────────────────────────────── */
function ImgPlaceholder({
  className = "",
  label = "",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`img-placeholder bg-stone-100 ${className}`}
      aria-hidden="true"
    >
      {label && (
        <span className="label-xs text-stone-400 text-center px-4">
          {label}
        </span>
      )}
    </div>
  );
}

/* ─── Place card (compact) ───────────────────────────────────────────────────── */
function PlaceCard({
  slug,
  title,
  titleJa,
  category,
  excerpt,
  topPick,
}: {
  slug: string;
  title: string;
  titleJa?: string;
  category: string[];
  excerpt: string;
  topPick: boolean;
}) {
  return (
    <Link
      href={`/places/${slug}`}
      className="group flex gap-5 border border-border p-5 hover:border-foreground/20 transition-colors overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative shrink-0 overflow-hidden">
        <ImgPlaceholder className="h-20 w-20" />
        {topPick && (
          <span className="absolute top-1.5 left-1.5 label-xs bg-foreground text-primary-foreground px-1.5 py-0.5">
            ★
          </span>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 min-w-0">
        <TagList tags={category} variant="category" size="sm" />
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

      {/* Arrow */}
      <span className="shrink-0 self-center font-sans text-xs text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 transition-all ml-auto pl-2">
        →
      </span>
    </Link>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const neighborhood = neighborhoods.find((n) => n.slug === slug);
  if (!neighborhood) notFound();

  const neighborhoodPlaces = places.filter((p) =>
    neighborhood.placeSlugs.includes(p.slug),
  );

  return (
    <div className="pb-24">
      {/* ── Hero header ────────────────────────────────────────────────── */}
      <section className="border-b border-border py-16 md:py-24">
        <Container>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-2"
          >
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

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
            {/* Left: title + meta */}
            <div className="flex flex-col gap-6">
              <div>
                <Heading as="h1" size="xl" font="serif" className="mb-2">
                  {neighborhood.name}
                </Heading>
                {neighborhood.nameJa && (
                  <p className="font-sans text-sm tracking-widest text-muted-foreground/60">
                    {neighborhood.nameJa}
                  </p>
                )}
              </div>

              {/* Ambiance tags */}
              {neighborhood.ambiance && neighborhood.ambiance.length > 0 && (
                <div className="flex flex-wrap gap-2">
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

              {/* Place count */}
              {neighborhoodPlaces.length > 0 && (
                <p className="font-sans text-xs text-muted-foreground/50">
                  {neighborhoodPlaces.length} place
                  {neighborhoodPlaces.length !== 1 ? "s" : ""} listed in this
                  area
                </p>
              )}
            </div>

            {/* Right: intro */}
            <div>
              <p className="font-sans text-base leading-[1.9] text-muted-foreground">
                {neighborhood.intro}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Hero image placeholder ──────────────────────────────────────── */}
      <Container className="mt-1 mb-0">
        <ImgPlaceholder
          className="w-full aspect-[21/9]"
          label={`${neighborhood.name} — hero image`}
        />
      </Container>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <Container className="mt-14">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_340px] lg:gap-20 items-start">
          {/* ── Left column: places ───────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="label-xs text-muted-foreground/60 mb-2">
                  In this area
                </p>
                <div className="divider w-12" />
              </div>
              <Link
                href={`/places`}
                className="font-sans text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                All places →
              </Link>
            </div>

            {neighborhoodPlaces.length > 0 ? (
              <div className="flex flex-col gap-4">
                {neighborhoodPlaces.map((place) => (
                  <PlaceCard key={place.slug} {...place} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3 border border-dashed border-border p-10 text-center">
                <p className="font-serif text-lg text-muted-foreground">
                  Places coming soon.
                </p>
                <p className="font-sans text-sm text-muted-foreground/60">
                  This district is part of the guide but specific listings are
                  still being added.
                </p>
                <Link
                  href="/places"
                  className="mt-2 font-sans text-xs tracking-[0.12em] uppercase text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  Browse all places
                </Link>
              </div>
            )}
          </div>

          {/* ── Right column: half-day route + map CTA ────────────────── */}
          <aside className="flex flex-col gap-8 lg:sticky lg:top-20">
            {/* Half-day route */}
            {neighborhood.halfDayRoute && (
              <div className="border border-border p-7 flex flex-col gap-5">
                <div>
                  <p className="label-xs text-muted-foreground/60 mb-3">
                    Half-day route
                  </p>
                  <div className="h-px w-8 bg-accent" />
                </div>
                <Heading as="h3" size="xs" font="serif">
                  A suggested morning or afternoon
                </Heading>
                <p className="font-sans text-sm leading-[1.85] text-muted-foreground">
                  {neighborhood.halfDayRoute}
                </p>
                <p className="font-sans text-[0.65rem] text-muted-foreground/40 tracking-wide">
                  This is a suggestion, not an itinerary. Adjust for weather,
                  mood, and what&apos;s open.
                </p>
              </div>
            )}

            {/* Map CTA */}
            <div className="border border-border p-7 flex flex-col gap-4">
              <p className="label-xs text-muted-foreground/60">On the map</p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                See all places in {neighborhood.name} plotted on the Kyoto map.
              </p>
              <Link
                href="/map"
                className="inline-flex h-9 items-center border border-border px-5 font-sans text-[0.68rem] tracking-[0.12em] uppercase text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors"
              >
                Open map →
              </Link>
            </div>

            {/* Explore other neighborhoods */}
            <div className="border border-border p-7 flex flex-col gap-4">
              <p className="label-xs text-muted-foreground/60">Other areas</p>
              <div className="flex flex-col gap-2">
                {neighborhoods
                  .filter((n) => n.slug !== slug)
                  .slice(0, 4)
                  .map((n) => (
                    <Link
                      key={n.slug}
                      href={`/neighborhoods/${n.slug}`}
                      className="group flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                    >
                      <div>
                        <p className="font-sans text-sm text-foreground group-hover:opacity-60 transition-opacity">
                          {n.name}
                        </p>
                        {n.nameJa && (
                          <p className="font-sans text-xs text-muted-foreground/40">
                            {n.nameJa}
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
