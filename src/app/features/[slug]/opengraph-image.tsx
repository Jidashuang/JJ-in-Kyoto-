import { ImageResponse } from "next/og";
import { features } from "@/data/features";

/**
 * Per-feature social card. Treats features as themed essays — uses the
 * "Feature" eyebrow and the feature's tag list as a third-line hint.
 *
 * Pre-rendered at build time via generateImageMetadata. Default Node runtime
 * because Edge can't combine with static image params.
 */

export const alt = "Feature — Kyoto by JJ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata() {
  return features.map((feature) => ({
    id: feature.slug,
    alt: `${feature.title} — Kyoto by JJ`,
    size,
    contentType,
  }));
}

export default async function FeatureOgImage({
  params,
}: {
  params: { slug: string };
}) {
  const feature = features.find((item) => item.slug === params.slug);
  const title = feature?.title ?? "Feature";
  const subtitle = feature?.intro ?? "";
  const tagLine =
    feature?.tags && feature.tags.length > 0
      ? feature.tags.slice(0, 3).join(" · ")
      : `${feature?.placeSlugs.length ?? 0} places`;

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
          <span>Feature</span>
          <span>{tagLine}</span>
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
              fontStyle: "italic",
              color: "#1a1a1a",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.4,
                color: "#3d3d3d",
                fontFamily: '"Inter", "Helvetica", sans-serif',
                maxWidth: 880,
              }}
            >
              {subtitle.length > 160 ? `${subtitle.slice(0, 160)}…` : subtitle}
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
