import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import MapWrapper from "@/components/MapWrapper";

export default async function HomePage() {
  const [bookstores, latestPosts, currentReads] = await Promise.all([
    prisma.bookstore.findMany({ orderBy: { name: "asc" } }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.currentRead.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold text-emerald-900">
          Shelf Life Seattle
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Explore the city&apos;s vibrant independent bookstore community. Click
          a marker to learn more about each shop, or use the search and filter
          tools below.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Blog sidebar */}
        <aside className="order-2 lg:order-1 lg:w-72 lg:shrink-0">
          <h2 className="mb-4 font-serif text-lg font-semibold text-emerald-900">
            Latest Posts
          </h2>
          <div className="flex flex-col gap-4">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-lg border border-gray-200 p-4 transition-all hover:border-amber-300 hover:shadow-md"
              >
                <h3 className="mb-1 text-sm font-semibold text-gray-900 group-hover:text-emerald-700">
                  {post.title}
                </h3>
                {post.publishedAt && (
                  <time className="mb-2 block text-xs text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
                <p className="line-clamp-3 text-xs leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
          <Link
            href="/blog"
            className="mt-4 inline-block text-sm font-medium text-emerald-700 hover:text-emerald-900"
          >
            All posts &rarr;
          </Link>
        </aside>

        {/* Map */}
        <div className="order-1 min-w-0 flex-1 lg:order-2">
          <MapWrapper bookstores={bookstores} />
        </div>
      </div>

      {/* What I'm Reading */}
      {currentReads.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 font-serif text-2xl font-bold text-emerald-900">
            What I&apos;m Reading
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentReads.map((read) => {
              const card = (
                <div className="flex gap-4 rounded-lg border border-gray-200 bg-amber-50 p-4 transition-all hover:border-amber-300 hover:shadow-md">
                  {read.coverUrl && (
                    <Image
                      src={read.coverUrl}
                      alt={`Cover of ${read.title}`}
                      width={80}
                      height={120}
                      className="h-[120px] w-[80px] shrink-0 rounded object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900">
                      {read.title}
                    </h3>
                    <p className="text-sm text-gray-500">by {read.author}</p>
                    {read.notes && (
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {read.notes}
                      </p>
                    )}
                  </div>
                </div>
              );

              if (read.linkUrl) {
                return (
                  <a
                    key={read.id}
                    href={read.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {card}
                  </a>
                );
              }

              return <div key={read.id}>{card}</div>;
            })}
          </div>
        </section>
      )}
    </div>
  );
}
