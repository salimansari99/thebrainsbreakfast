"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Thought = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  status: "PUBLISHED" | "DRAFT";
};

export default function EditThoughtForm({ thought }: { thought: Thought }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: thought.title,
    excerpt: thought.excerpt || "",
    content: thought.content,
    category: thought.category || "Life",
  });

  function updateField(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/admin/thoughts/${thought.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/thoughts");
      router.refresh();
    } else {
      alert("Failed to update thought");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="text-sm font-medium">Title</label>
        <input
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="mt-1 w-full rounded-lg border px-4 py-2"
          required
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="text-sm font-medium">Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => updateField("excerpt", e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg border px-4 py-2"
        />
      </div>

      {/* Content */}
      <div>
        <label className="text-sm font-medium">Content</label>
        <textarea
          value={form.content}
          onChange={(e) => updateField("content", e.target.value)}
          rows={10}
          className="mt-1 w-full rounded-lg border px-4 py-2"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium">Category</label>
        <select
          value={form.category}
          onChange={(e) => updateField("category", e.target.value)}
          className="mt-1 w-full rounded-lg border px-4 py-2"
        >
          <option>Life</option>
          <option>Motivation</option>
          <option>Success</option>
          <option>Tech</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? "Saving…" : "Save changes"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 rounded-lg border"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
