import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { TagList } from "@/components/ui/Tag";
import { neighborhoods } from "@/data/neighborhoods";
import { places } from "@/data/places";

export const metadata: Metadata = {
  title: "Map",
  description:
    "Browse Kyoto by neighborhood and featured places from the current guide.",
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
    <div className="border border-border bg-background px-5 py-4">
      <p className="label-xs text-muted-foreground/50 mb-2">{label}</p>
      <p className="font-serif text-2xl text-foreground">{value}</p>
    </div>
  );
}

export default function MapPage() {
  const featuredPlaces = places.filter((place) => place.topPick).slice(0, 8);
  const neighborhoodCounts = neighborhoods
    .map((neighborhood) => ({
      ...neighborhood,
      count: places.filter((place) =>
        neighborhood.placeSlugs.includes(place.slug),
      ).length,
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mb-14 md:mb-20">
          <p className="label-xs text-muted-foreground/60 mb-4">
            Browse by location
          </p>
          <div className="divider mb-6" />
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <Heading as="h1" size="xl" font="serif">
              Map
            </Heading>
            <p className="font-sans text-sm text-muted-foreground max-w-md leading-relaxed">
              Use this page to move between Kyoto&apos;s districts and the
              places linked to them.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <CountCard label="Neighborhoods" value={neighborhoods.length} />
          <CountCard label="Places" value={places.length} />
          <CountCard label="Top picks" value={featuredPlaces.length} />
        </div>
      </Container>

      <section className="mt-16 border-y border-border bg-muted/20 py-16">
        <Container>
          <div className="mb-10">
            <p className="label-xs text-muted-foreground/60 mb-3">
              By neighborhood
            </p>
            <div className="divider mb-6" />
            <Heading as="h2" size="md" font="serif">
              Districts
            </Heading>
          </div>

          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 xl:grid-cols-3 border border-border">
            {neighborhoodCounts.map((neighborhood) => (
              <Link
                key={neighborhood.slug}
                href={`/neighborhoods/${neighborhood.slug}`}
                className="group flex min-h-[220px] flex-col gap-5 bg-background p-7 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Heading
                      as="h3"
                      size="md"
                      font="serif"
                      className="group-hover:opacity-60 transition-opacity"
                    >
                      {neighborhood.name}
                    </Heading>
                    <p className="font-sans text-xs text-muted-foreground/50 mt-1 tracking-wider">
                      {titleCaseNeighborhood(neighborhood.slug)}
                    </p>
                  </div>
                  <span className="font-sans text-sm text-muted-foreground/30 mt-1 shrink-0 group-hover:text-foreground group-hover:translate-x-0.5 transition-all">
                    →
                  </span>
                </div>

                <p className="font-sans text-sm leading-relaxed text-muted-foreground line-clamp-4">
                  {neighborhood.intro}
                </p>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-border/60 pt-3">
                  <p className="font-sans text-xs text-muted-foreground/50">
                    {neighborhood.count} place
                    {neighborhood.count !== 1 ? "s" : ""} listed
                  </p>
                  {neighborhood.ambiance && neighborhood.ambiance.length > 0 && (
                    <TagList
                      tags={neighborhood.ambiance.slice(0, 2)}
                      variant="outline"
                      size="sm"
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="mb-10">
            <p className="label-xs text-muted-foreground/60 mb-3">
              Featured places
            </p>
            <div className="divider mb-6" />
            <Heading as="h2" size="md" font="serif">
              Top picks across the guide
            </Heading>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPlaces.map((place) => (
              <Link
                key={place.slug}
                href={`/places/${place.slug}`}
                className="group flex flex-col gap-4 border border-border bg-background p-5 transition-colors hover:border-foreground/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <TagList tags={place.category} variant="category" size="sm" />
                  <span className="font-sans text-xs text-muted-foreground/30 group-hover:text-foreground transition-colors">
                    →
                  </span>
                </div>

                <div>
                  <Heading
                    as="h3"
                    size="sm"
                    font="serif"
                    className="group-hover:opacity-70 transition-opacity"
                  >
                    {place.title}
                  </Heading>
                  <p className="font-sans text-xs text-muted-foreground/50 mt-1">
                    {titleCaseNeighborhood(place.neighborhood)}
                  </p>
                </div>

                <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {place.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
