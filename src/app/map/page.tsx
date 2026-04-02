import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { features } from "@/data/features";
import { neighborhoods } from "@/data/neighborhoods";
import { places } from "@/data/places";

export const metadata: Metadata = {
  title: "Map",
  description:
    "Browse Kyoto by neighborhood, feature, or place index — a lightweight way to move through the guide.",
};

function IndexCard({
  href,
  label,
  title,
  intro,
  tags,
  meta,
}: {
  href: string;
  label: string;
  title: string;
  intro: string;
  tags: string[];
  meta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 border border-border p-6 md:p-8 hover:border-foreground/20 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-xs text-muted-foreground/60 mb-2">{label}</p>
          <Heading
            as="h3"
            size="sm"
            font="serif"
            className="group-hover:opacity-70 transition-opacity"
          >
            {title}
          </Heading>
        </div>
        <span className="font-sans text-xs text-muted-foreground/40 mt-1 shrink-0 group-hover:text-foreground transition-colors">
          →
        </span>
      </div>

      <p className="font-sans text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {intro}
      </p>

      <div className="mt-auto pt-4 border-t border-border/60 flex items-center justify-between gap-4">
        <TagList tags={tags.slice(0, 3)} variant="default" size="sm" />
        <span className="font-sans text-xs text-muted-foreground/40 shrink-0">
          {meta}
        </span>
      </div>
    </Link>
  );
}

export default function MapPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <section className="mb-14 md:mb-20">
          <div className="max-w-2xl">
            <p className="label-xs mb-5 text-muted-foreground/60">
              Browse by structure
            </p>
            <Heading as="h1" size="xl" font="serif" className="mb-5">
              Map
            </Heading>
            <p className="font-sans text-base leading-relaxed text-muted-foreground max-w-xl">
              Use this page as a lightweight index of the guide. Move by area,
              by editorial theme, or by the full place list depending on how
              you want to explore Kyoto.
            </p>
          </div>
        </section>

        <Section
          spacing="sm"
          label="Neighborhoods"
          heading={<Heading as="h2" size="lg" font="serif">Browse by area</Heading>}
          action={<Link href="/neighborhoods">All neighborhoods →</Link>}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {neighborhoods.slice(0, 6).map((neighborhood) => (
              <IndexCard
                key={neighborhood.slug}
                href={`/neighborhoods/${neighborhood.slug}`}
                label="Area"
                title={neighborhood.name}
                intro={neighborhood.intro}
                tags={neighborhood.ambiance ?? []}
                meta={`${neighborhood.placeSlugs.length} places`}
              />
            ))}
          </div>
        </Section>

        <Section
          spacing="sm"
          label="Features"
          heading={<Heading as="h2" size="lg" font="serif">Browse by theme</Heading>}
          action={<Link href="/features">All features →</Link>}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.slice(0, 5).map((feature) => (
              <IndexCard
                key={feature.slug}
                href={`/features/${feature.slug}`}
                label="Theme"
                title={feature.title}
                intro={feature.intro}
                tags={feature.placeSlugs.slice(0, 3)}
                meta={`${feature.placeSlugs.length} places`}
              />
            ))}
          </div>
        </Section>

        <Section
          spacing="sm"
          label="Places"
          heading={<Heading as="h2" size="lg" font="serif">Browse the full index</Heading>}
          action={<Link href="/places">All places →</Link>}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {places.slice(0, 9).map((place) => (
              <IndexCard
                key={place.slug}
                href={`/places/${place.slug}`}
                label={place.neighborhood}
                title={place.title}
                intro={place.excerpt}
                tags={place.tags}
                meta={place.category[0]}
              />
            ))}
          </div>
        </Section>
      </Container>
    </div>
  );
}
