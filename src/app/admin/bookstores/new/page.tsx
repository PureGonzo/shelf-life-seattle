"use client";

import Link from "next/link";
import BookstoreEditor from "@/components/BookstoreEditor";

export default function NewBookstorePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/admin/bookstores"
        className="mb-2 inline-block text-sm text-emerald-700 hover:text-emerald-900"
      >
        &larr; Back to bookstores
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-emerald-900">
        Add Bookstore
      </h1>
      <BookstoreEditor />
    </div>
  );
}
