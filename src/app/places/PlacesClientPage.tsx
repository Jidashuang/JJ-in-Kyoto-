"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { Heading } from "@/components/ui/Heading";
import { Tag, TagList } from "@/components/ui/Tag";
import { PLACE_CATEGORIES } from "@/data/place-taxonomy";
import { places } from "@/data/places";

const ALL_OPTION = "All";

const CATEGORY_OPTIONS = [ALL_OPTION, ...PLACE_CATEGORIES] as const;

function titleCaseNeighborhood(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

type PlaceCardProps = {
  slug: string;
  title: string;
  titleJa?: string;
  category: string[];
  neighborhood: string;
  tags: string[];
  excerpt: string;
  topPick: boolean;
  heroImage: string;
};

function PlaceCard({
  slug,
  title,
  titleJa,
  category,
  neighborhood,
  tags,
  excerpt,
  topPick,
  heroImage,
}: PlaceCardProps) {
  return (
    <Link
      href={`/places/${slug}`}
      className="group flex flex-col gap-0 border border-border hover:border-foreground/20 transition-colors overflow-hidden bg-background"
    >
      <div className="relative overflow-hidden">
        <SmartImage
          src={heroImage}
          alt={title}
          fallbackLabel={category[0]}
          className="aspect-[3/2] w-full"
          imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {topPick && (
          <span className="absolute top-3 left-3 label-xs bg-foreground text-primary-foreground px-2 py-1 rounded-sm">
            Top Pick
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 p-5 pb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <TagList tags={category} variant="category" size="sm" />
          <span className="text-border">·</span>
          <span className="label-xs truncate">
            {titleCaseNeighborhood(neighborhood)}
          </span>
        </div>

        <div>
          <h3 className="font-serif text-lg leading-snug text-foreground group-hover:opacity-70 transition-opacity">
            {title}
          </h3>
          {titleJa && (
            <p className="font-sans text-xs text-muted-foreground/60 mt-0.5">
              {titleJa}
            </p>
          )}
        </div>

        <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        {tags.length > 0 && (
          <TagList
            tags={tags.slice(0, 3)}
            variant="default"
            size="sm"
            className="mt-auto pt-1"
          />
        )}
      </div>
    </Link>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="flex flex-col gap-2 min-w-[180px]">
      <span className="label-xs text-muted-foreground/70">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-sm border border-border bg-background px-3 text-sm font-sans text-foreground outline-none transition-colors focus:border-foreground/40"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

type EmptyStateProps = {
  onReset: () => void;
};

function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center border border-dashed border-border rounded-sm">
      <p className="font-serif text-2xl text-muted-foreground">
        No places match your filters.
      </p>
      <p className="font-sans text-sm text-muted-foreground/70 max-w-md">
        Try broadening your search, changing one of the filters, or clearing all
        selections.
      </p>
      <button
        onClick={onReset}
        className="font-sans text-xs uppercase tracking-[0.08em] border border-border px-4 py-2 rounded-sm hover:border-foreground/40 transition-colors"
      >
        Reset filters
      </button>
    </div>
  );
}

export default function PlacesClientPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_OPTION);
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<string>(ALL_OPTION);
  const [selectedTag, setSelectedTag] = useState<string>(ALL_OPTION);

  const neighborhoodOptions = useMemo(() => {
    const unique = Array.from(
      new Set(places.map((place) => place.neighborhood)),
    ).sort((a, b) => a.localeCompare(b));
    return [ALL_OPTION, ...unique.map(titleCaseNeighborhood)];
  }, []);

  const neighborhoodRawByLabel = useMemo(() => {
    const map = new Map<string, string>();
    places.forEach((place) => {
      map.set(titleCaseNeighborhood(place.neighborhood), place.neighborhood);
    });
    return map;
  }, []);

  const tagOptions = useMemo(() => {
    const unique = Array.from(
      new Set(places.flatMap((place) => place.tags)),
    ).sort((a, b) => a.localeCompare(b));
    return [ALL_OPTION, ...unique];
  }, []);

  const filteredPlaces = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return places.filter((place) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          place.title,
          place.titleJa ?? "",
          place.excerpt,
          place.neighborhood,
          ...place.category,
          ...place.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesCategory =
        selectedCategory === ALL_OPTION ||
        place.category.includes(selectedCategory as never);

      const neighborhoodRaw = neighborhoodRawByLabel.get(selectedNeighborhood);
      const matchesNeighborhood =
        selectedNeighborhood === ALL_OPTION ||
        place.neighborhood === neighborhoodRaw;

      const matchesTag =
        selectedTag === ALL_OPTION || place.tags.includes(selectedTag as never);

      return (
        matchesQuery && matchesCategory && matchesNeighborhood && matchesTag
      );
    });
  }, [
    query,
    selectedCategory,
    selectedNeighborhood,
    selectedTag,
    neighborhoodRawByLabel,
  ]);

  const resetFilters = () => {
    setQuery("");
    setSelectedCategory(ALL_OPTION);
    setSelectedNeighborhood(ALL_OPTION);
    setSelectedTag(ALL_OPTION);
  };

  return (
    <>
      <section className="border-b border-border bg-muted/20 py-14 md:py-20">
        <Container>
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="label-xs text-muted-foreground/60">Kyoto by JJ</p>
            <Heading as="h1" size="xl" font="serif">
              Places
            </Heading>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              {places.length} places across Kyoto&apos;s neighbourhoods — cafes,
              bookstores, sweets, walks, and more. Chosen for atmosphere over
              fame.
            </p>
          </div>
        </Container>
      </section>

      <div className="sticky top-[60px] z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
            {CATEGORY_OPTIONS.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="shrink-0"
                  aria-pressed={isActive}
                >
                  <Tag
                    variant={isActive ? "category" : "outline"}
                    size="md"
                    className="cursor-pointer hover:border-foreground/40 transition-colors"
                  >
                    {cat}
                  </Tag>
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-6 border-b border-border">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_auto_auto] md:items-end">
            <label className="flex flex-col gap-2">
              <span className="label-xs text-muted-foreground/70">Search</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, category, mood, or excerpt…"
                className="h-9 rounded-sm border border-border bg-background px-3 text-sm font-sans text-foreground outline-none transition-colors focus:border-foreground/40"
              />
            </label>

            <FilterSelect
              label="Neighborhood"
              value={selectedNeighborhood}
              options={neighborhoodOptions}
              onChange={setSelectedNeighborhood}
            />

            <FilterSelect
              label="Tag"
              value={selectedTag}
              options={tagOptions}
              onChange={setSelectedTag}
            />

            <button
              onClick={resetFilters}
              className="h-9 rounded-sm border border-border px-3 text-xs font-sans uppercase tracking-[0.08em] hover:border-foreground/40 transition-colors md:self-end"
            >
              Clear
            </button>
          </div>

          <div className="flex items-center justify-between pt-5">
            <p className="font-sans text-xs text-muted-foreground">
              Showing{" "}
              <span className="text-foreground font-medium">
                {filteredPlaces.length}
              </span>{" "}
              of{" "}
              <span className="text-foreground font-medium">
                {places.length}
              </span>{" "}
              places
            </p>
            <p className="hidden sm:block font-sans text-xs text-muted-foreground/50 italic">
              Refined for quiet browsing
            </p>
          </div>
        </div>
      </Container>

      <Container className="py-10 pb-24">
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.slug} {...place} />
            ))}
          </div>
        ) : (
          <EmptyState onReset={resetFilters} />
        )}

        <p className="mt-14 text-center font-sans text-xs text-muted-foreground/40">
          More places are added as the guide grows. Last reviewed from source
          material.
        </p>
      </Container>
    </>
  );
}
