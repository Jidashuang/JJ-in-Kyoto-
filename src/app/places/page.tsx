import type { Metadata } from "next";
import PlacesClientPage from "./PlacesClientPage";

export const metadata: Metadata = {
  title: "Places",
  description:
    "A selective list of cafes, bookstores, sweets, walks, and more across Kyoto's neighbourhoods.",
};

export default function PlacesPage() {
  return <PlacesClientPage />;
}
