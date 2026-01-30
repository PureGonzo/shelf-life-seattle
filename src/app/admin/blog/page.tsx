"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  publishedAt: string | null;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog?all=true")
      .then((res) => res.json())
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    setPosts(posts.filter((p) => p.id !== id));
  };

  const togglePublish = async (post: BlogPost) => {
    const res = await fetch(`/api/blog/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
    });
    const updated = await res.json();
    setPosts(posts.map((p) => (p.id === post.id ? updated : p)));
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin"
            className="mb-2 inline-block text-sm text-emerald-700 hover:text-emerald-900"
          >
            &larr; Back to admin
          </Link>
          <h1 className="font-serif text-3xl font-bold text-emerald-900">Blog Posts</h1>
        </div>
        <Link
          href="/admin/blog/new"
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
        >
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No blog posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
            >
              <div>
                <h2 className="font-semibold text-gray-900">{post.title}</h2>
                <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      post.published
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                  {post.publishedAt && (
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => togglePublish(post)}
                  className="rounded px-3 py-1 text-sm text-emerald-700 transition-colors hover:bg-amber-50"
                >
                  {post.published ? "Unpublish" : "Publish"}
                </button>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="rounded px-3 py-1 text-sm text-blue-700 transition-colors hover:bg-blue-50"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="rounded px-3 py-1 text-sm text-red-700 transition-colors hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
