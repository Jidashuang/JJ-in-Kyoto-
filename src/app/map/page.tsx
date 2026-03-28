import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "Map",
  description:
    "A light map of curated places across Kyoto — browse by neighborhood or category.",
};

export default function MapPage() {
  return (
    <div className="flex flex-col">
      {/* ── Page header ─────────────────────────────────────────────── */}
      <section className="border-b border-border py-16 md:py-24">
        <Container>
          <div className="max-w-xl">
            <p className="label-xs mb-5 text-muted-foreground/60">
              Explore by location
            </p>
            <Heading as="h1" size="xl" font="serif" className="mb-5">
              Map
            </Heading>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              Browse all listed places on a light map of Kyoto. Filter by
              category, click a marker to preview, and jump to the full detail
              page from there.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Coming soon ─────────────────────────────────────────────── */}
      <section className="flex-1 flex items-center py-24 md:py-36">
        <Container size="narrow">
          <div className="flex flex-col items-center text-center gap-8">
            {/* Decorative map glyph */}
            <div
              className="w-20 h-20 rounded-full border border-border flex items-center justify-center text-muted-foreground/30"
              aria-hidden="true"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Simplified map pin + grid */}
                <circle cx="18" cy="15" r="5" />
                <path d="M18 20 C18 20 10 27 10 32 L26 32 C26 27 18 20 18 20Z" />
                <line x1="4" y1="8" x2="4" y2="28" strokeOpacity="0.4" />
                <line x1="32" y1="8" x2="32" y2="28" strokeOpacity="0.4" />
                <line x1="4" y1="8" x2="10" y2="6" strokeOpacity="0.4" />
                <line x1="32" y1="8" x2="26" y2="6" strokeOpacity="0.4" />
                <line x1="4" y1="28" x2="10" y2="30" strokeOpacity="0.4" />
                <line x1="32" y1="28" x2="26" y2="30" strokeOpacity="0.4" />
              </svg>
            </div>

            <div className="flex flex-col gap-3">
              <Heading as="h2" size="md" font="serif">
                The map is on its way.
              </Heading>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-sm">
                We&apos;re building a lightweight, distraction-free map that
                plots every listed place across the city. Filter by category,
                pan by neighborhood, and keep the itinerary planning
                lightweight.
              </p>
            </div>

            {/* What to expect */}
            <div className="w-full max-w-sm border border-border divide-y divide-border mt-4 text-left">
              {[
                {
                  label: "All place markers",
                  note: "Every listing plotted at its exact address.",
                },
                {
                  label: "Category filter",
                  note: "Show only cafes, bookstores, walks, and so on.",
                },
                {
                  label: "Marker previews",
                  note: "Tap a pin to see the name, excerpt, and a link.",
                },
                {
                  label: "Neighborhood overlay",
                  note:
                    "Loose district outlines to orient yourself at a glance.",
                },
              ].map(({ label, note }) => (
                <div key={label} className="flex flex-col gap-1 px-5 py-4">
                  <p className="font-sans text-xs font-medium text-foreground tracking-wide">
                    {label}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {note}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-sans text-xs text-muted-foreground/50 mt-2">
              In the meantime, each place detail page links out to Google Maps.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
