"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if already authenticated by trying to load admin content
    fetch("/api/blog?all=true")
      .then((res) => {
        if (res.ok) setAuthenticated(true);
      })
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setAuthenticated(true);
    } else {
      setError("Invalid password");
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-sm rounded-lg border border-gray-200 p-8 shadow-sm">
          <h1 className="mb-6 font-serif text-2xl font-bold text-emerald-900">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-serif text-3xl font-bold text-emerald-900">
        Admin Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Blog Management */}
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Blog Posts
          </h2>
          <p className="mb-4 text-gray-600">
            Create, edit, and manage blog posts with live markdown preview.
          </p>
          <div className="flex gap-3">
            <Link
              href="/admin/blog"
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
            >
              Manage Posts
            </Link>
            <Link
              href="/admin/blog/new"
              className="rounded-lg border border-emerald-700 px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-amber-50"
            >
              New Post
            </Link>
          </div>
        </div>

        {/* Bookstore Management */}
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Bookstores
          </h2>
          <p className="mb-4 text-gray-600">
            Add, edit, and manage bookstore listings.
          </p>
          <div className="flex gap-3">
            <Link
              href="/admin/bookstores"
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
            >
              Manage Bookstores
            </Link>
            <Link
              href="/admin/bookstores/new"
              className="rounded-lg border border-emerald-700 px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-amber-50"
            >
              Add Bookstore
            </Link>
          </div>
        </div>


      </div>
    </div>
  );
}
