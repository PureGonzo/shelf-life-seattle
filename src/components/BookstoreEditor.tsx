"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookstoreEditorProps {
  initialData?: {
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
  };
}

export default function BookstoreEditor({ initialData }: BookstoreEditorProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    slug: initialData?.slug ?? "",
    address: initialData?.address ?? "",
    neighborhood: initialData?.neighborhood ?? "",
    lat: initialData?.lat?.toString() ?? "",
    lng: initialData?.lng?.toString() ?? "",
    description: initialData?.description ?? "",
    websiteUrl: initialData?.websiteUrl ?? "",
    hours: initialData?.hours ?? "",
    specialty: initialData?.specialty ?? "",
  });
  const [saving, setSaving] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "name" && !isEditing) {
        next.slug = generateSlug(value);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = isEditing
      ? `/api/bookstores/${initialData.id}`
      : "/api/bookstores";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
        websiteUrl: form.websiteUrl || null,
        hours: form.hours || null,
        specialty: form.specialty || null,
      }),
    });

    if (res.ok) {
      router.push("/admin/bookstores");
    } else {
      alert("Failed to save bookstore");
    }

    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Neighborhood
          </label>
          <input
            type="text"
            value={form.neighborhood}
            onChange={(e) => updateField("neighborhood", e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            value={form.lat}
            onChange={(e) => updateField("lat", e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            value={form.lng}
            onChange={(e) => updateField("lng", e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          required
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Website URL
          </label>
          <input
            type="url"
            value={form.websiteUrl}
            onChange={(e) => updateField("websiteUrl", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Hours
          </label>
          <input
            type="text"
            value={form.hours}
            onChange={(e) => updateField("hours", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Specialty
          </label>
          <input
            type="text"
            value={form.specialty}
            onChange={(e) => updateField("specialty", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-amber-700 px-6 py-2 font-medium text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Update Bookstore"
              : "Add Bookstore"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/bookstores")}
          className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
