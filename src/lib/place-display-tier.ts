import auditData from "../../data/research/place_status_audit.json";
import type { Place, PlaceDisplayTier } from "@/types/place";

type PlaceAuditStatus =
  | "ready_to_publish"
  | "usable_but_needs_image"
  | "needs_manual_review"
  | "hold_back_for_now";

type AuditRecord = {
  slug: string;
  status: PlaceAuditStatus;
};

type AuditData = {
  records?: AuditRecord[];
};

const auditRecords = ((auditData as AuditData).records ?? []).filter(
  (record): record is AuditRecord =>
    typeof record.slug === "string" && typeof record.status === "string",
);

const auditStatusBySlug = new Map(
  auditRecords.map((record) => [record.slug, record.status]),
);

function mapStatusToTier(params: {
  status?: PlaceAuditStatus;
  topPick: boolean;
}): PlaceDisplayTier {
  const { status, topPick } = params;

  switch (status) {
    case "ready_to_publish":
      return topPick ? "hero" : "standard";
    case "usable_but_needs_image":
      return topPick ? "standard" : "minimal";
    case "needs_manual_review":
      return "minimal";
    case "hold_back_for_now":
      return "hidden";
    default:
      return topPick ? "standard" : "minimal";
  }
}

export function getPlaceDisplayTier(place: Pick<Place, "slug" | "topPick">): PlaceDisplayTier {
  return mapStatusToTier({
    status: auditStatusBySlug.get(place.slug),
    topPick: place.topPick,
  });
}
