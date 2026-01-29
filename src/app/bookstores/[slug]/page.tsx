import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bookstore = await prisma.bookstore.findUnique({ where: { slug } });

  if (!bookstore) {
    return { title: "Bookstore Not Found" };
  }

  return {
    title: bookstore.name,
    description: bookstore.description.slice(0, 160),
  };
}

export default async function BookstoreDetailPage({ params }: Props) {
  const { slug } = await params;
  const bookstore = await prisma.bookstore.findUnique({ where: { slug } });

  if (!bookstore) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/bookstores"
        className="mb-6 inline-block text-sm text-amber-700 hover:text-amber-900"
      >
        &larr; Back to all bookstores
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-amber-900">
            {bookstore.name}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
              {bookstore.neighborhood}
            </span>
            {bookstore.specialty && (
              <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                {bookstore.specialty}
              </span>
            )}
          </div>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="text-lg leading-relaxed text-gray-700">
              {bookstore.description}
            </p>
          </div>

          <aside className="rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Details
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="text-gray-900">{bookstore.address}</p>
              </div>

              {bookstore.hours && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Hours</h3>
                  <p className="text-gray-900">{bookstore.hours}</p>
                </div>
              )}

              {bookstore.websiteUrl && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Website
                  </h3>
                  <a
                    href={bookstore.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:text-amber-900"
                  >
                    Visit website &rarr;
                  </a>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Neighborhood
                </h3>
                <p className="text-gray-900">{bookstore.neighborhood}</p>
              </div>

              {bookstore.specialty && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Specialty
                  </h3>
                  <p className="text-gray-900">{bookstore.specialty}</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
