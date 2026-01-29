"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import BookstoreEditor from "@/components/BookstoreEditor";

interface Bookstore {
  id: number;
  name: string;
  slug: string;
  address: string;
  neighborhood: string;
  lat: number;
  lng: number;
  description: string;
  websiteUrl: string | null;
  hours: string | null;
  specialty: string | null;
}

export default function EditBookstorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [bookstore, setBookstore] = useState<Bookstore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/bookstores/${id}`)
      .then((res) => res.json())
      .then(setBookstore)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!bookstore) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Bookstore not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/admin/bookstores"
        className="mb-2 inline-block text-sm text-amber-700 hover:text-amber-900"
      >
        &larr; Back to bookstores
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-amber-900">
        Edit Bookstore
      </h1>
      <BookstoreEditor initialData={bookstore} />
    </div>
  );
}
