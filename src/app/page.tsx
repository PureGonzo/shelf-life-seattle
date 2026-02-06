import Link from "next/link";
import { prisma } from "@/lib/prisma";
import MapWrapper from "@/components/MapWrapper";
import CurrentlyReading from "@/components/CurrentlyReading";

export default async function HomePage() {
  const [bookstores, blogPosts] = await Promise.all([
    prisma.bookstore.findMany({ orderBy: { name: "asc" } }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 4,
    }),
  ]);

  const featuredPost = blogPosts[0] ?? null;
  const recentPosts = blogPosts.slice(1);

  function extractFirstImage(content: string): string | null {
    const match = content.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
  }

  return (
    <>
      {/* Hero — full-bleed banner */}
      <div className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-emerald-900/70" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 font-serif text-5xl font-bold text-white sm:text-6xl">
            Shelf Life Seattle
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-amber-100/90">
            Stories, reviews, and explorations from Seattle&apos;s vibrant
            independent bookstore community.
          </p>
        </div>
      </div>

      {/* Rest of page in container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Featured blog post */}
      <section className="mb-12">
        {featuredPost ? (
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm transition-all hover:border-amber-300 hover:shadow-lg md:flex"
          >
            {(featuredPost.imageUrl ??
              extractFirstImage(featuredPost.content)) && (
              <div className="md:w-2/5">
                <img
                  src={
                    (featuredPost.imageUrl ??
                      extractFirstImage(featuredPost.content))!
                  }
                  alt=""
                  className="h-64 w-full object-cover md:h-full"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <h2 className="mb-2 font-serif text-2xl font-bold text-gray-900 group-hover:text-emerald-700 md:text-3xl">
                {featuredPost.title}
              </h2>
              {featuredPost.publishedAt && (
                <time className="mb-3 block text-sm text-gray-400">
                  {new Date(featuredPost.publishedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </time>
              )}
              {featuredPost.excerpt && (
                <p className="mb-4 line-clamp-3 text-gray-600">
                  {featuredPost.excerpt}
                </p>
              )}
              <span className="text-sm font-medium text-emerald-700 group-hover:text-emerald-900">
                Read more &rarr;
              </span>
            </div>
          </Link>
        ) : (
          <div className="rounded-xl border border-amber-200 p-12 text-center text-gray-500">
            No blog posts yet. Check back soon!
          </div>
        )}
      </section>

      {/* Recent posts row */}
      {recentPosts.length > 0 && (
        <div className="mb-12 rounded-2xl bg-white/70 p-6 sm:p-8">
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-emerald-900">
                Recent Posts
              </h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
              >
                All posts &rarr;
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => {
                const postImage =
                  post.imageUrl ?? extractFirstImage(post.content);
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group rounded-lg border border-amber-200 bg-white shadow-sm transition-all hover:border-amber-300 hover:shadow-md"
                  >
                    {postImage && (
                      <img
                        src={postImage}
                        alt=""
                        className="h-40 w-full rounded-t-lg object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="mb-1 font-serif text-lg font-semibold text-gray-900 group-hover:text-emerald-700">
                        {post.title}
                      </h3>
                      {post.publishedAt && (
                        <time className="mb-2 block text-xs text-gray-400">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </time>
                      )}
                      {post.excerpt && (
                        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* What I'm Reading */}
      <CurrentlyReading />

      {/* Map section */}
      <div className="rounded-2xl bg-white/70 p-6 sm:p-8">
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-emerald-900">
              Bookstore Map
            </h2>
            <Link
              href="/map"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
            >
              Full map &rarr;
            </Link>
          </div>
          <MapWrapper bookstores={bookstores} />
        </section>
      </div>
      </div>
    </>
  );
}
