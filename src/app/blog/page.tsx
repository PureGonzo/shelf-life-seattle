import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stories, guides, and news about Seattle's independent bookstore community.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-emerald-900">Blog</h1>
      <p className="mb-8 text-gray-600">
        Stories and guides about Seattle&apos;s independent bookstores
      </p>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Check back soon!</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border-b border-gray-200 pb-8 last:border-b-0"
            >
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="mb-2 text-2xl font-semibold text-gray-900 group-hover:text-emerald-700">
                  {post.title}
                </h2>
              </Link>
              {post.publishedAt && (
                <time className="mb-3 block text-sm text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              <p className="mb-3 text-gray-600">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
              >
                Read more &rarr;
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
