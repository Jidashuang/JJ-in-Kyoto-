import type { Metadata } from "next";
import { Suspense } from "react";
import PlacesClientPage from "./PlacesClientPage";

export const metadata: Metadata = {
  title: "Places",
  description:
    "A selective list of cafes, bookstores, sweets, walks, and more across Kyoto's neighbourhoods.",
};

export default function PlacesPage() {
  // useSearchParams needs a Suspense boundary to keep the route static.
  return (
    <Suspense>
      <PlacesClientPage />
    </Suspense>
  );
}
