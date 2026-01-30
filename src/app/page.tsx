import Link from "next/link";
import { prisma } from "@/lib/prisma";
import MapWrapper from "@/components/MapWrapper";

export default async function HomePage() {
  const [bookstores, latestPosts] = await Promise.all([
    prisma.bookstore.findMany({ orderBy: { name: "asc" } }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-amber-900">
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
          <h2 className="mb-4 text-lg font-semibold text-amber-900">
            Latest Posts
          </h2>
          <div className="flex flex-col gap-4">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-lg border border-gray-200 p-4 transition-all hover:border-amber-300 hover:shadow-md"
              >
                <h3 className="mb-1 text-sm font-semibold text-gray-900 group-hover:text-amber-700">
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
            className="mt-4 inline-block text-sm font-medium text-amber-700 hover:text-amber-900"
          >
            All posts &rarr;
          </Link>
        </aside>

        {/* Map */}
        <div className="order-1 min-w-0 flex-1 lg:order-2">
          <MapWrapper bookstores={bookstores} />
        </div>
      </div>
    </div>
  );
}
