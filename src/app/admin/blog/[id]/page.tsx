"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import BlogEditor from "@/components/BlogEditor";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
}

export default function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((res) => res.json())
      .then(setPost)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Post not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/admin/blog"
        className="mb-2 inline-block text-sm text-amber-700 hover:text-amber-900"
      >
        &larr; Back to blog posts
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-amber-900">
        Edit Blog Post
      </h1>
      <BlogEditor initialData={post} />
    </div>
  );
}
