"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { Heading } from "@/components/ui/Heading";
import { Tag, TagList } from "@/components/ui/Tag";
import { PLACE_CATEGORIES, PLACE_INTENT_GROUPS } from "@/data/place-taxonomy";
import { places } from "@/data/places";
import { selectPlacesForSurface } from "@/lib/place-display-selectors";
import {
  getPlaceNeighborhoodBucket,
  getPlaceNeighborhoodLabel,
  titleCaseNeighborhood,
} from "@/lib/place-neighborhood";

const ALL_OPTION = "All";
const ALL_INTENT = "all-intents";

const CATEGORY_OPTIONS = [ALL_OPTION, ...PLACE_CATEGORIES] as const;

function resolveAreaLabel(params: {
  neighborhood: string;
  canonicalNeighborhood?: string;
  subarea?: string;
}) {
  const canonical =
    params.canonicalNeighborhood?.trim() ||
    titleCaseNeighborhood(params.neighborhood);
  const subarea = params.subarea?.trim();

  return {
    canonical,
    subarea,
    label: subarea ? `${canonical} · ${subarea}` : canonical,
  };
}

type PlaceCardProps = {
  slug: string;
  title: string;
  titleJa?: string;
  category: string[];
  neighborhood: string;
  canonicalNeighborhood?: string;
  subarea?: string;
  tags: string[];
  excerpt: string;
  curatorNote?: string;
  topPick: boolean;
  heroImage: string;
};

function PlaceCard({
  slug,
  title,
  titleJa,
  category,
  neighborhood,
  canonicalNeighborhood,
  subarea,
  tags,
  excerpt,
  curatorNote,
  topPick,
  heroImage,
}: PlaceCardProps) {
  const area = resolveAreaLabel({ neighborhood, canonicalNeighborhood, subarea });
  const note = curatorNote?.trim() || excerpt;

  return (
    <Link
      href={`/places/${slug}`}
      className="group flex flex-col gap-0 overflow-hidden border border-border bg-background transition-colors hover:border-foreground/20"
    >
      <div className="relative overflow-hidden border-b border-border/70">
        <SmartImage
          src={heroImage}
          alt={title}
          fallbackLabel={category[0]}
          className="aspect-[4/3] w-full"
          imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {topPick && (
          <span className="absolute left-3 top-3 label-xs rounded-sm bg-foreground px-2 py-1 text-primary-foreground">
            Top Pick
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 pb-6">
        <p className="label-xs text-muted-foreground/60">{area.label}</p>

        <div>
          <h3 className="font-serif text-lg leading-snug text-foreground transition-opacity group-hover:opacity-70">
            {title}
          </h3>
          {titleJa && (
            <p className="mt-0.5 font-sans text-xs text-muted-foreground/60">
              {titleJa}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <p className="label-xs text-muted-foreground/60">Curator note</p>
          <p className="line-clamp-3 font-sans text-sm leading-relaxed text-muted-foreground">
            {note}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-1">
          <TagList tags={category} variant="category" size="sm" />
          {tags.length > 0 && (
            <TagList tags={tags.slice(0, 3)} variant="default" size="sm" />
          )}
        </div>
      </div>
    </Link>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
};

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="flex min-w-[180px] flex-col gap-2">
      <span className="label-xs text-muted-foreground/70">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-sm border border-border bg-background px-3 text-sm font-sans text-foreground outline-none transition-colors focus:border-foreground/40"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
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
    <div className="flex flex-col items-center gap-4 rounded-sm border border-border border-dashed py-24 text-center">
      <p className="font-serif text-2xl text-muted-foreground">
        No places match your filters.
      </p>
      <p className="max-w-md font-sans text-sm text-muted-foreground/70">
        Try broadening your search, changing one of the filters, or clearing all
        selections.
      </p>
      <button
        onClick={onReset}
        className="rounded-sm border border-border px-4 py-2 font-sans text-xs uppercase tracking-[0.08em] transition-colors hover:border-foreground/40"
      >
        Reset filters
      </button>
    </div>
  );
}

export default function PlacesClientPage() {
  const [query, setQuery] = useState("");
  const [selectedIntent, setSelectedIntent] =
    useState<string>(ALL_INTENT);
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_OPTION);
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<string>(ALL_OPTION);
  const [selectedTag, setSelectedTag] = useState<string>(ALL_OPTION);
  const visiblePlaces = useMemo(
    () => selectPlacesForSurface(places, "all_places"),
    [],
  );

  const neighborhoodOptions = useMemo(() => {
    const byBucket = new Map<string, string>();
    visiblePlaces.forEach((place) => {
      byBucket.set(
        getPlaceNeighborhoodBucket(place),
        getPlaceNeighborhoodLabel(place),
      );
    });

    return [
      { value: ALL_OPTION, label: ALL_OPTION },
      ...Array.from(byBucket.entries())
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [visiblePlaces]);

  const tagOptions = useMemo(() => {
    const unique = Array.from(
      new Set(visiblePlaces.flatMap((place) => place.tags)),
    ).sort((a, b) => a.localeCompare(b));
    return [ALL_OPTION, ...unique];
  }, [visiblePlaces]);

  const filteredPlaces = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const selectedIntentConfig = PLACE_INTENT_GROUPS.find(
      (intent) => intent.id === selectedIntent,
    );

    return visiblePlaces.filter((place) => {
      const matchesIntent =
        selectedIntent === ALL_INTENT ||
        (!selectedIntentConfig
          ? true
          : (selectedIntentConfig.topPick && place.topPick) ||
            selectedIntentConfig.categories?.some((category) =>
              place.category.includes(category),
            ) ||
            selectedIntentConfig.tags?.some((tag) => place.tags.includes(tag)));

      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          place.title,
          place.titleJa ?? "",
          place.excerpt,
          place.curatorNote ?? "",
          place.neighborhood,
          place.canonicalNeighborhood ?? "",
          place.subarea ?? "",
          ...place.category,
          ...place.tags,
          ...(place.bestFor ?? []),
          ...(place.mood ?? []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesCategory =
        selectedCategory === ALL_OPTION ||
        place.category.includes(selectedCategory as (typeof place.category)[number]);

      const matchesNeighborhood =
        selectedNeighborhood === ALL_OPTION ||
        getPlaceNeighborhoodBucket(place) === selectedNeighborhood;

      const matchesTag =
        selectedTag === ALL_OPTION ||
        place.tags.includes(selectedTag as (typeof place.tags)[number]);

      return (
        matchesIntent &&
        matchesQuery &&
        matchesCategory &&
        matchesNeighborhood &&
        matchesTag
      );
    });
  }, [
    query,
    selectedIntent,
    selectedCategory,
    selectedNeighborhood,
    selectedTag,
    visiblePlaces,
  ]);

  const resetFilters = () => {
    setQuery("");
    setSelectedIntent(ALL_INTENT);
    setSelectedCategory(ALL_OPTION);
    setSelectedNeighborhood(ALL_OPTION);
    setSelectedTag(ALL_OPTION);
  };

  return (
    <>
      <section className="border-b border-border bg-muted/20 py-14 md:py-20">
        <Container>
          <div className="flex max-w-2xl flex-col gap-4">
            <p className="label-xs text-muted-foreground/60">Kyoto by JJ</p>
            <Heading as="h1" size="xl" font="serif">
              Places
            </Heading>
            <p className="font-sans text-base leading-relaxed text-muted-foreground">
              Browse by travel intent first, then refine by area, category, and
              tags when you need precision.
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <div className="border-b border-border py-6">
          <div className="grid grid-cols-1 gap-5">
            <label className="flex flex-col gap-2">
              <span className="label-xs text-muted-foreground/70">Search</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by place, intent, mood, or note…"
                className="h-9 rounded-sm border border-border bg-background px-3 text-sm font-sans text-foreground outline-none transition-colors focus:border-foreground/40"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedIntent(ALL_INTENT)}
                className="shrink-0"
                aria-pressed={selectedIntent === ALL_INTENT}
              >
                <Tag
                  variant={selectedIntent === ALL_INTENT ? "category" : "outline"}
                  size="md"
                  className="cursor-pointer transition-colors hover:border-foreground/40"
                >
                  All
                </Tag>
              </button>
              {PLACE_INTENT_GROUPS.map((intent) => {
                const isActive = selectedIntent === intent.id;
                return (
                  <button
                    key={intent.id}
                    onClick={() => setSelectedIntent(intent.id)}
                    className="shrink-0"
                    aria-pressed={isActive}
                  >
                    <Tag
                      variant={isActive ? "category" : "outline"}
                      size="md"
                      className="cursor-pointer transition-colors hover:border-foreground/40"
                    >
                      {intent.label}
                    </Tag>
                  </button>
                );
              })}
            </div>

            <details className="group rounded-sm border border-border px-4 py-3">
              <summary className="cursor-pointer list-none font-sans text-xs uppercase tracking-[0.08em] text-muted-foreground/75">
                Advanced filters (category / neighborhood / tags)
              </summary>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
                <FilterSelect
                  label="Category"
                  value={selectedCategory}
                  options={[...CATEGORY_OPTIONS].map((value) => ({
                    value,
                    label: value,
                  }))}
                  onChange={setSelectedCategory}
                />

                <FilterSelect
                  label="Neighborhood"
                  value={selectedNeighborhood}
                  options={neighborhoodOptions}
                  onChange={setSelectedNeighborhood}
                />

                <FilterSelect
                  label="Tag"
                  value={selectedTag}
                  options={tagOptions.map((value) => ({ value, label: value }))}
                  onChange={setSelectedTag}
                />

                <button
                  onClick={resetFilters}
                  className="h-9 rounded-sm border border-border px-3 text-xs font-sans uppercase tracking-[0.08em] transition-colors hover:border-foreground/40 md:self-end"
                >
                  Clear all
                </button>
              </div>
            </details>
          </div>

          <div className="flex items-center justify-between pt-5">
            <p className="font-sans text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredPlaces.length}
              </span>{" "}
              of <span className="font-medium text-foreground">{visiblePlaces.length}</span>{" "}
              places
            </p>
            <p className="hidden font-sans text-xs italic text-muted-foreground/50 sm:block">
              Editorial picks for atmosphere-first travel
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
