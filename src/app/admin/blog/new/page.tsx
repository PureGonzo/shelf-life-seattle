"use client";

import Link from "next/link";
import BlogEditor from "@/components/BlogEditor";

export default function NewBlogPostPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/admin/blog"
        className="mb-2 inline-block text-sm text-emerald-700 hover:text-emerald-900"
      >
        &larr; Back to blog posts
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-emerald-900">
        New Blog Post
      </h1>
      <BlogEditor />
    </div>
  );
}
