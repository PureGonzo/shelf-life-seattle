import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="mb-6 inline-block text-sm text-emerald-700 hover:text-emerald-900"
      >
        &larr; Back to blog
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="mb-3 text-4xl font-bold text-emerald-900">
            {post.title}
          </h1>
          {post.publishedAt && (
            <time className="text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </header>

        <div className="prose prose-emerald max-w-none prose-headings:text-emerald-900 prose-a:text-emerald-700 prose-strong:text-gray-900">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </div>
      </article>
    </div>
  );
}
