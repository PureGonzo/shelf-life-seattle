"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Bookstore {
  id: number;
  name: string;
  neighborhood: string;
  slug: string;
}

export default function AdminBookstoresPage() {
  const [bookstores, setBookstores] = useState<Bookstore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookstores")
      .then((res) => res.json())
      .then(setBookstores)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this bookstore?")) return;

    await fetch(`/api/bookstores/${id}`, { method: "DELETE" });
    setBookstores(bookstores.filter((b) => b.id !== id));
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
          <h1 className="font-serif text-3xl font-bold text-emerald-900">Bookstores</h1>
        </div>
        <Link
          href="/admin/bookstores/new"
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
        >
          Add Bookstore
        </Link>
      </div>

      {bookstores.length === 0 ? (
        <p className="text-gray-500">No bookstores yet.</p>
      ) : (
        <div className="space-y-4">
          {bookstores.map((store) => (
            <div
              key={store.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
            >
              <div>
                <h2 className="font-semibold text-gray-900">{store.name}</h2>
                <p className="text-sm text-gray-500">{store.neighborhood}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/bookstores/${store.id}`}
                  className="rounded px-3 py-1 text-sm text-blue-700 transition-colors hover:bg-blue-50"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(store.id)}
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
