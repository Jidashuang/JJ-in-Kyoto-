import type { JsonLd } from "@/lib/structured-data";

/**
 * Renders one or more JSON-LD documents as <script type="application/ld+json">
 * tags. Stays a server component — no client JS, no hydration cost.
 *
 * Pass either a single object or an array. Arrays render as multiple
 * <script> tags so each entity stays its own valid document, which Google
 * prefers over a single graph for unrelated entities.
 *
 * Usage:
 *   <StructuredData data={websiteJsonLd()} />
 *   <StructuredData data={[placeJsonLd(p), breadcrumbJsonLd(crumbs)]} />
 */
export function StructuredData({
  data,
}: {
  data: JsonLd | JsonLd[];
}) {
  const documents = Array.isArray(data) ? data : [data];
  return (
    <>
      {documents.map((doc, index) => (
        <script
          key={index}
          type="application/ld+json"
          // JSON.stringify escapes </script> safely as long as we don't have
          // user input. All inputs here come from typed local data files.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(doc) }}
        />
      ))}
    </>
  );
}
