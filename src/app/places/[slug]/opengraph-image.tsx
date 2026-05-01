import { ImageResponse } from "next/og";
import { places } from "@/data/places";

/**
 * Generates a per-place social card via Next.js's ImageResponse.
 * Editorial layout: small kicker, large serif title, neighborhood label.
 *
 * Pre-rendered at build time via generateImageMetadata so each place gets a
 * static PNG. Uses the default Node runtime — Edge can't combine with
 * generateImageMetadata (Next forbids `runtime: "edge"` + static params).
 */

export const alt = "Place — Kyoto by JJ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pre-render every place's OG image at build time.
export function generateImageMetadata() {
  return places.map((place) => ({
    id: place.slug,
    alt: `${place.title} — Kyoto by JJ`,
    size,
    contentType,
  }));
}

export default async function PlaceOgImage({
  params,
}: {
  params: { slug: string };
}) {
  const place = places.find((item) => item.slug === params.slug);
  const title = place?.title ?? "Place";
  const eyebrow = place?.canonicalNeighborhood
    ? place.canonicalNeighborhood
    : "Kyoto";
  const subtitle = place?.essence ?? place?.excerpt ?? "";

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
          <span>{eyebrow}</span>
          <span>Place</span>
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
              fontSize: 84,
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
