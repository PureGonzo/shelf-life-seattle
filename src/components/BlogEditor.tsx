"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogEditorProps {
  initialData?: {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    published: boolean;
  };
}

export default function BlogEditor({ initialData }: BlogEditorProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const insertMarkdown = (before: string, after: string, placeholder: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);

    let newContent: string;
    let cursorStart: number;
    let cursorEnd: number;

    if (selected) {
      newContent = content.substring(0, start) + before + selected + after + content.substring(end);
      cursorStart = start + before.length;
      cursorEnd = cursorStart + selected.length;
    } else {
      newContent = content.substring(0, start) + before + placeholder + after + content.substring(end);
      cursorStart = start + before.length;
      cursorEnd = cursorStart + placeholder.length;
    }

    setContent(newContent);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });

    if (res.ok) {
      const { url } = await res.json();
      insertMarkdown("![", `](${url})`, "image description");
    } else {
      const { error } = await res.json();
      alert(error || "Upload failed");
    }

    // Reset file input so re-uploading the same file triggers onChange
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = isEditing ? `/api/blog/${initialData.id}` : "/api/blog";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, content, excerpt, published }),
    });

    if (res.ok) {
      router.push("/admin/blog");
    } else {
      alert("Failed to save post");
    }

    setSaving(false);
  };

  const toolbarButtons = [
    { label: "B", title: "Bold", action: () => insertMarkdown("**", "**", "bold text") },
    { label: "I", title: "Italic", action: () => insertMarkdown("*", "*", "italic text") },
    { label: "H2", title: "Heading 2", action: () => insertMarkdown("## ", "", "Heading") },
    { label: "H3", title: "Heading 3", action: () => insertMarkdown("### ", "", "Heading") },
    { label: "Link", title: "Link", action: () => insertMarkdown("[", "](url)", "link text") },
    { label: "Img", title: "Image", action: () => fileInputRef.current?.click() },
    { label: "UL", title: "Unordered List", action: () => insertMarkdown("- ", "", "list item") },
    { label: "OL", title: "Ordered List", action: () => insertMarkdown("1. ", "", "list item") },
    { label: ">", title: "Blockquote", action: () => insertMarkdown("> ", "", "quote") },
    { label: "</>", title: "Code Block", action: () => insertMarkdown("```\n", "\n```", "code") },
    { label: "---", title: "Horizontal Rule", action: () => insertMarkdown("\n---\n", "", "") },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tab bar */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("write")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "write"
              ? "border-b-2 border-emerald-700 text-emerald-700"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "preview"
              ? "border-b-2 border-emerald-700 text-emerald-700"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Preview
        </button>
      </div>

      {activeTab === "write" ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Content (Markdown)
            </label>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 rounded-t-lg border border-b-0 border-gray-300 bg-gray-50 px-2 py-1.5">
              {toolbarButtons.map((btn) => (
                <button
                  key={btn.title}
                  type="button"
                  title={btn.title}
                  onClick={btn.action}
                  className="rounded px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={15}
              className="w-full rounded-b-lg rounded-t-none border border-gray-300 px-4 py-2 font-mono text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            {/* Hidden file input for image uploads */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded border-gray-300 text-emerald-700 focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Publish immediately
              </span>
            </label>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-emerald-700 px-6 py-2 font-medium text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
              >
                {saving ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin/blog")}
                className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Preview tab */
        <div className="mx-auto max-w-3xl py-4">
          <h1 className="mb-3 text-4xl font-bold text-emerald-900">
            {title || "Untitled Post"}
          </h1>
          <time className="text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <div className="prose prose-emerald mt-6 max-w-none prose-headings:text-emerald-900 prose-a:text-emerald-700 prose-strong:text-gray-900">
            <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
          </div>
        </div>
      )}
    </form>
  );
}
