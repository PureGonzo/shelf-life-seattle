import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import MapWrapper from "@/components/MapWrapper";

export const metadata: Metadata = {
  title: "Map | Shelf Life Seattle",
  description:
    "Explore Seattle's independent bookstores on an interactive map. Find shops by neighborhood, specialty, and more.",
};

export default async function MapPage() {
  const bookstores = await prisma.bookstore.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold text-emerald-900">
          Bookstore Map
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Explore the city&apos;s vibrant independent bookstore community. Click
          a marker to learn more about each shop, or use the search and filter
          tools below.
        </p>
      </div>

      <MapWrapper bookstores={bookstores} />
    </div>
  );
}
