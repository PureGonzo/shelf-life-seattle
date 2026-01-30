"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CurrentRead {
  id: number;
  title: string;
  author: string;
  coverUrl: string | null;
  linkUrl: string | null;
  notes: string | null;
  active: boolean;
  sortOrder: number;
}

export default function AdminReadsPage() {
  const [reads, setReads] = useState<CurrentRead[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [notes, setNotes] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editCoverUrl, setEditCoverUrl] = useState("");
  const [editLinkUrl, setEditLinkUrl] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const fetchReads = () => {
    fetch("/api/current-reads?active=false")
      .then((res) => res.json())
      .then(setReads)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReads();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/current-reads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, coverUrl, linkUrl, notes }),
    });
    if (res.ok) {
      const newRead = await res.json();
      setReads([...reads, newRead]);
      setTitle("");
      setAuthor("");
      setCoverUrl("");
      setLinkUrl("");
      setNotes("");
    }
  };

  const handleToggleActive = async (read: CurrentRead) => {
    const res = await fetch(`/api/current-reads/${read.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !read.active }),
    });
    if (res.ok) {
      const updated = await res.json();
      setReads(reads.map((r) => (r.id === read.id ? updated : r)));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this book?")) return;
    await fetch(`/api/current-reads/${id}`, { method: "DELETE" });
    setReads(reads.filter((r) => r.id !== id));
  };

  const handleMove = async (read: CurrentRead, direction: "up" | "down") => {
    const sorted = [...reads].sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = sorted.findIndex((r) => r.id === read.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const other = sorted[swapIdx];
    await Promise.all([
      fetch(`/api/current-reads/${read.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: other.sortOrder }),
      }),
      fetch(`/api/current-reads/${other.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: read.sortOrder }),
      }),
    ]);
    fetchReads();
  };

  const startEdit = (read: CurrentRead) => {
    setEditingId(read.id);
    setEditTitle(read.title);
    setEditAuthor(read.author);
    setEditCoverUrl(read.coverUrl || "");
    setEditLinkUrl(read.linkUrl || "");
    setEditNotes(read.notes || "");
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    const res = await fetch(`/api/current-reads/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        author: editAuthor,
        coverUrl: editCoverUrl || null,
        linkUrl: editLinkUrl || null,
        notes: editNotes || null,
      }),
    });
    if (res.ok) {
      const updated = await res.json();
      setReads(reads.map((r) => (r.id === editingId ? updated : r)));
      setEditingId(null);
    }
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
      <div className="mb-6">
        <Link
          href="/admin"
          className="mb-2 inline-block text-sm text-emerald-700 hover:text-emerald-900"
        >
          &larr; Back to admin
        </Link>
        <h1 className="font-serif text-3xl font-bold text-emerald-900">
          Current Reads
        </h1>
      </div>

      {/* Add form */}
      <form
        onSubmit={handleAdd}
        className="mb-8 rounded-lg border border-gray-200 p-6"
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Add a Book
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Author *
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Cover URL
            </label>
            <input
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Link URL
            </label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 rounded-lg bg-emerald-700 px-6 py-2 font-medium text-white transition-colors hover:bg-emerald-600"
        >
          Add Book
        </button>
      </form>

      {/* List */}
      {reads.length === 0 ? (
        <p className="text-gray-500">No books added yet.</p>
      ) : (
        <div className="space-y-4">
          {reads.map((read) => (
            <div
              key={read.id}
              className={`rounded-lg border p-4 ${
                read.active
                  ? "border-gray-200"
                  : "border-gray-200 bg-gray-50 opacity-60"
              }`}
            >
              {editingId === read.id ? (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Title"
                      className="rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="text"
                      value={editAuthor}
                      onChange={(e) => setEditAuthor(e.target.value)}
                      placeholder="Author"
                      className="rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="url"
                      value={editCoverUrl}
                      onChange={(e) => setEditCoverUrl(e.target.value)}
                      placeholder="Cover URL"
                      className="rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="url"
                      value={editLinkUrl}
                      onChange={(e) => setEditLinkUrl(e.target.value)}
                      placeholder="Link URL"
                      className="rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Notes"
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="rounded px-3 py-1 text-sm font-medium text-white bg-emerald-700 transition-colors hover:bg-emerald-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {read.title}
                    </h3>
                    <p className="text-sm text-gray-500">by {read.author}</p>
                    {read.notes && (
                      <p className="mt-1 text-sm text-gray-600">
                        {read.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMove(read, "up")}
                      className="rounded px-2 py-1 text-sm text-gray-500 transition-colors hover:bg-gray-100"
                      title="Move up"
                    >
                      &uarr;
                    </button>
                    <button
                      onClick={() => handleMove(read, "down")}
                      className="rounded px-2 py-1 text-sm text-gray-500 transition-colors hover:bg-gray-100"
                      title="Move down"
                    >
                      &darr;
                    </button>
                    <button
                      onClick={() => handleToggleActive(read)}
                      className="rounded px-3 py-1 text-sm text-emerald-700 transition-colors hover:bg-amber-50"
                    >
                      {read.active ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={() => startEdit(read)}
                      className="rounded px-3 py-1 text-sm text-blue-700 transition-colors hover:bg-blue-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(read.id)}
                      className="rounded px-3 py-1 text-sm text-red-700 transition-colors hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
