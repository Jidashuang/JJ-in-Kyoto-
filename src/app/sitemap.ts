import type { MetadataRoute } from "next";
import { places } from "@/data/places";
import { features } from "@/data/features";
import { neighborhoods } from "@/data/neighborhoods";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/places",
    "/features",
    "/neighborhoods",
    "/map",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    priority: route === "" ? 1 : 0.7,
  }));

  const placeRoutes: MetadataRoute.Sitemap = places.map((place) => ({
    url: `${siteUrl}/places/${place.slug}`,
    priority: place.topPick ? 0.9 : 0.8,
  }));

  const featureRoutes: MetadataRoute.Sitemap = features.map((feature) => ({
    url: `${siteUrl}/features/${feature.slug}`,
    priority: 0.7,
  }));

  const neighborhoodRoutes: MetadataRoute.Sitemap = neighborhoods.map(
    (neighborhood) => ({
      url: `${siteUrl}/neighborhoods/${neighborhood.slug}`,
      priority: 0.75,
    }),
  );

  return [
    ...staticRoutes,
    ...placeRoutes,
    ...featureRoutes,
    ...neighborhoodRoutes,
  ];
}
