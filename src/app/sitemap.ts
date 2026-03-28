import type { MetadataRoute } from "next";
import { places } from "@/data/places";
import { features } from "@/data/features";
import { neighborhoods } from "@/data/neighborhoods";

const siteUrl = "https://kyoto-guide.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/places",
    "/features",
    "/neighborhoods",
    "/map",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const placeRoutes: MetadataRoute.Sitemap = places.map((place) => ({
    url: `${siteUrl}/places/${place.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: place.topPick ? 0.9 : 0.8,
  }));

  const featureRoutes: MetadataRoute.Sitemap = features.map((feature) => ({
    url: `${siteUrl}/features/${feature.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const neighborhoodRoutes: MetadataRoute.Sitemap = neighborhoods.map(
    (neighborhood) => ({
      url: `${siteUrl}/neighborhoods/${neighborhood.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
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
