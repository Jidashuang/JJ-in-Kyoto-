import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { TagList } from "@/components/ui/Tag";
import { places } from "@/data/places";
import { features } from "@/data/features";
import { neighborhoods } from "@/data/neighborhoods";

/* ─── Placeholder image ────────────────────────────────────────────────────── */
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

/* ─── Feature card ─────────────────────────────────────────────────────────── */
function FeatureCard({
  slug,
  title,
  subtitle,
  intro,
}: {
  slug: string;
  title: string;
  subtitle?: string;
  intro: string;
}) {
  return (
    <Link
      href={`/features/${slug}`}
      className="group flex flex-col gap-0 border border-border hover:border-foreground/20 transition-colors overflow-hidden"
    >
      {/* Cover image */}
      <ImgPlaceholder
        className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.02]"
        label="Feature cover"
      />

      {/* Text */}
      <div className="flex flex-col gap-2 p-5 pb-6">
        {subtitle && (
          <p className="label-xs text-muted-foreground">{subtitle}</p>
        )}
        <Heading
          as="h3"
          size="sm"
          font="serif"
          className="group-hover:opacity-70 transition-opacity"
        >
          {title}
        </Heading>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-3 mt-1">
          {intro}
        </p>
      </div>
    </Link>
  );
}

/* ─── Place card ───────────────────────────────────────────────────────────── */
function PlaceCard({
  slug,
  title,
  titleJa,
  category,
  neighborhood,
  tags,
  excerpt,
}: {
  slug: string;
  title: string;
  titleJa?: string;
  category: string[];
  neighborhood: string;
  tags: string[];
  excerpt: string;
}) {
  return (
    <Link
      href={`/places/${slug}`}
      className="group flex flex-col gap-0 border border-border hover:border-foreground/20 transition-colors overflow-hidden"
    >
      {/* Image */}
      <ImgPlaceholder
        className="aspect-[3/2] w-full transition-transform duration-500 group-hover:scale-[1.02]"
        label={category[0]}
      />

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 pb-6">
        {/* Category + neighborhood */}
        <div className="flex items-center gap-2">
          <TagList tags={category} variant="category" size="sm" />
          <span className="text-border">·</span>
          <span className="label-xs">{neighborhood}</span>
        </div>

        {/* Title */}
        <div>
          <Heading
            as="h3"
            size="xs"
            font="serif"
            className="group-hover:opacity-70 transition-opacity leading-snug"
          >
            {title}
          </Heading>
          {titleJa && (
            <p className="font-sans text-xs text-muted-foreground/60 mt-0.5">
              {titleJa}
            </p>
          )}
        </div>

        {/* Excerpt */}
        <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <TagList
            tags={tags.slice(0, 3)}
            variant="default"
            size="sm"
            className="mt-1"
          />
        )}
      </div>
    </Link>
  );
}

/* ─── Neighborhood card ────────────────────────────────────────────────────── */
function NeighborhoodCard({
  slug,
  name,
  nameJa,
  intro,
  ambiance = [],
}: {
  slug: string;
  name: string;
  nameJa?: string;
  intro: string;
  ambiance?: string[];
}) {
  return (
    <Link
      href={`/neighborhoods/${slug}`}
      className="group flex flex-col gap-4 border border-border p-6 md:p-8 hover:border-foreground/20 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <Heading
            as="h3"
            size="sm"
            font="serif"
            className="group-hover:opacity-70 transition-opacity"
          >
            {name}
          </Heading>
          {nameJa && (
            <p className="font-sans text-xs text-muted-foreground/60 mt-0.5">
              {nameJa}
            </p>
          )}
        </div>
        <span className="font-sans text-xs text-muted-foreground/40 mt-1 shrink-0 group-hover:text-foreground transition-colors">
          →
        </span>
      </div>

      <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {intro}
      </p>

      {ambiance.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {ambiance.map((word) => (
            <span key={word} className="label-xs">
              {word}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const topPicks = places.filter((p) => p.topPick).slice(0, 4);
  const featuredFeatures = features.slice(0, 3);
  const featuredNeighborhoods = neighborhoods.slice(0, 4);

  return (
    <>
      {/* ──────────────────────────────────────────────────────── Hero ── */}
      <section className="relative flex min-h-[88svh] flex-col justify-end pb-20 pt-32 overflow-hidden">
        {/* Background tonal wash */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background to-muted/40"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <p className="label-xs mb-8 text-muted-foreground/70">
              Kyoto City Guide &nbsp;—&nbsp; Personal Curation
            </p>

            {/* Display heading */}
            <Heading
              as="h1"
              size="display"
              font="serif"
              className="mb-8 text-foreground"
            >
              Kyoto
              <br />
              <em className="not-italic opacity-60">by</em> JJ
            </Heading>

            {/* Tagline */}
            <p className="font-sans text-lg leading-relaxed text-muted-foreground max-w-lg mb-12">
              An edited Kyoto guide built from repeated visits, a narrow
              selection, and places worth returning to.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/places"
                className="inline-flex h-11 items-center border border-foreground bg-foreground px-8 font-sans text-[0.7rem] tracking-[0.15em] uppercase text-primary-foreground transition-opacity hover:opacity-75"
              >
                Browse Places
              </Link>
              <Link
                href="/features"
                className="inline-flex h-11 items-center border border-border px-8 font-sans text-[0.7rem] tracking-[0.15em] uppercase text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                Open Features
              </Link>
            </div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="h-10 w-px bg-foreground animate-[fade-in_2s_ease_1s_both]" />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────── Features ── */}
      <Section spacing="default">
        <Container>
          <div className="mb-10 md:mb-14">
            <div className="flex items-center justify-between mb-3">
              <p className="label-xs text-muted-foreground">Editorial</p>
              <Link
                href="/features"
                className="font-sans text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                All features →
              </Link>
            </div>
            <div className="h-px bg-border" />
            <div className="mt-6">
              <Heading as="h2" size="lg" font="serif">
                Features
              </Heading>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredFeatures.map((f) => (
              <FeatureCard key={f.slug} {...f} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────── Top Picks ── */}
      <Section spacing="default" className="bg-muted/30">
        <Container>
          <div className="mb-10 md:mb-14">
            <div className="flex items-center justify-between mb-3">
              <p className="label-xs text-muted-foreground">Selected</p>
              <Link
                href="/places"
                className="font-sans text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                All places →
              </Link>
            </div>
            <div className="h-px bg-border" />
            <div className="mt-6">
              <Heading as="h2" size="lg" font="serif">
                Top Picks
              </Heading>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topPicks.map((p) => (
              <PlaceCard key={p.slug} {...p} />
            ))}
          </div>

          {/* Teaser count */}
            <p className="mt-10 font-sans text-sm text-muted-foreground text-center">
              {places.length} places selected from repeat visits and close
              reading.
            </p>
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────── Neighborhoods ── */}
      <Section spacing="default">
        <Container>
          <div className="mb-10 md:mb-14">
            <div className="flex items-center justify-between mb-3">
              <p className="label-xs text-muted-foreground">By Area</p>
              <Link
                href="/neighborhoods"
                className="font-sans text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                All neighborhoods →
              </Link>
            </div>
            <div className="h-px bg-border" />
            <div className="mt-6">
              <Heading as="h2" size="lg" font="serif">
                Neighborhoods
              </Heading>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredNeighborhoods.map((n) => (
              <NeighborhoodCard key={n.slug} {...n} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ───────────────────────────────────────────────────── About CTA ── */}
      <section className="border-t border-border py-24">
        <Container size="narrow">
          <div className="flex flex-col items-center text-center gap-6">
            <p className="label-xs text-muted-foreground/60">
              About this guide
            </p>
            <Heading as="h2" size="md" font="serif" className="max-w-sm">
              A selective record of the city, built from repeated visits and
              careful editing.
            </Heading>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs">
              Places are chosen for atmosphere, consistency, and repeat value.
              Content comes from direct visits and source notes, not volume.
            </p>
            <Link
              href="/about"
              className="mt-2 font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Read the about page
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
