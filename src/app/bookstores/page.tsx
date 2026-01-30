import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Bookstores",
  description:
    "Browse all independent bookstores in Seattle. Find your next favorite shop by neighborhood, specialty, or name.",
};

export default async function BookstoresPage() {
  const bookstores = await prisma.bookstore.findMany({
    orderBy: { name: "asc" },
  });

  const neighborhoods = Array.from(
    new Set(bookstores.map((b) => b.neighborhood))
  ).sort();

  const grouped = neighborhoods.map((n) => ({
    neighborhood: n,
    stores: bookstores.filter((b) => b.neighborhood === n),
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-emerald-900">
        Shelf Life Seattle
      </h1>
      <p className="mb-8 text-gray-600">
        {bookstores.length} independent bookstores across the city
      </p>

      {grouped.map(({ neighborhood, stores }) => (
        <section key={neighborhood} className="mb-10">
          <h2 className="mb-4 border-b border-emerald-200 pb-2 text-xl font-semibold text-emerald-800">
            {neighborhood}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <Link
                key={store.id}
                href={`/bookstores/${store.slug}`}
                className="group rounded-lg border border-gray-200 p-6 transition-all hover:border-emerald-300 hover:shadow-md"
              >
                <h3 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-emerald-700">
                  {store.name}
                </h3>
                <p className="mb-2 text-sm text-gray-500">{store.address}</p>
                {store.specialty && (
                  <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                    {store.specialty}
                  </span>
                )}
                <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                  {store.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
