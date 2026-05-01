import { ImageResponse } from "next/og";
import { neighborhoods } from "@/data/neighborhoods";

/**
 * Per-neighborhood social card. Uses the neighborhood `hook` line if present
 * (these are intentionally written as one-liners), falling back to the intro.
 *
 * Pre-rendered at build time via generateImageMetadata. Default Node runtime
 * because Edge can't combine with static image params.
 */

export const alt = "Neighborhood — Kyoto by JJ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata() {
  return neighborhoods.map((neighborhood) => ({
    id: neighborhood.slug,
    alt: `${neighborhood.name} — Kyoto by JJ`,
    size,
    contentType,
  }));
}

export default async function NeighborhoodOgImage({
  params,
}: {
  params: { slug: string };
}) {
  const neighborhood = neighborhoods.find((item) => item.slug === params.slug);
  const title = neighborhood?.name ?? "Neighborhood";
  const subtitle = neighborhood?.hook ?? neighborhood?.intro ?? "";
  const placeCount = neighborhood?.placeSlugs.length ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#faf8f3",
          color: "#1a1a1a",
          fontFamily: '"Georgia", "Times New Roman", serif',
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6b5e4a",
            fontFamily: '"Inter", "Helvetica", sans-serif',
          }}
        >
          <span>Neighborhood</span>
          <span>
            {placeCount} {placeCount === 1 ? "place" : "places"}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "#1a1a1a",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.35,
                color: "#3d3d3d",
                fontFamily: '"Inter", "Helvetica", sans-serif',
                maxWidth: 880,
              }}
            >
              {subtitle.length > 140 ? `${subtitle.slice(0, 140)}…` : subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            color: "#6b5e4a",
            fontFamily: '"Inter", "Helvetica", sans-serif',
            letterSpacing: "0.04em",
          }}
        >
          <span style={{ fontStyle: "italic" }}>Kyoto by JJ</span>
          <span>jjinkyoto.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
