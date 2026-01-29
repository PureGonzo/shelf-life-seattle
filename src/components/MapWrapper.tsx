"use client";

import dynamic from "next/dynamic";

const BookstoreMap = dynamic(() => import("@/components/BookstoreMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center rounded-lg bg-gray-100">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

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

export default function MapWrapper({
  bookstores,
}: {
  bookstores: Bookstore[];
}) {
  return <BookstoreMap bookstores={bookstores} />;
}
