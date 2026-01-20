"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/uploadImage";

const categories = ["Life", "Motivation", "Success", "Tech"];

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80";

export default function CreateThoughtPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Life");
  const [publishDate, setPublishDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<"PUBLISHED" | "DRAFT" | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImage(null);
    setPreview(null);
  }

  async function submit(type: "PUBLISHED" | "DRAFT") {
    try {
      setAction(type);
      setLoading(true);
      setError(null);

      let imageUrl = PLACEHOLDER_IMAGE;

      if (image) {
        imageUrl = await uploadImage(image);
      }

      const res = await fetch("/api/admin/thoughts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          excerpt: content.slice(0, 140),
          category,
          author,
          imageUrl: imageUrl || undefined,
          publishDate:
            type === "PUBLISHED" && publishDate ? publishDate : undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }

      router.push("/admin/thoughts");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-3xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">
          Write a new post
        </h1>
        <p className="text-gray-500">Share something worth reading slowly.</p>
      </header>

      {/* Cover Image */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Cover image</label>

        <div className="relative border-2 border-dashed rounded-2xl p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-900 transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
            id="imageUpload"
          />

          <label htmlFor="imageUpload" className="cursor-pointer">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mx-auto rounded-xl max-h-72 object-cover"
              />
            ) : (
              <p className="text-sm text-gray-500">
                Click to upload a cover image
              </p>
            )}
          </label>

          {preview && (
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-black text-white"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Category</label>
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 text-sm rounded-full transition ${
                  active
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "border hover:bg-gray-100 dark:hover:bg-gray-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-500">Title</label>
        <div className="rounded-xl border focus-within:border-indigo-500">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 text-xl font-semibold bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-500">Content</label>
        <div className="rounded-xl border focus-within:border-indigo-500">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full px-5 py-4 text-lg resize-none bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Meta */}
      <div className="grid sm:grid-cols-2 gap-6">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="rounded-lg border p-3"
        />

        <input
          type="date"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          className="rounded-lg border p-3"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Actions */}
      <div className="flex gap-4 pt-12 pb-8">
        {/* Publish */}
        <button
          disabled={loading}
          onClick={() => submit("PUBLISHED")}
          className="px-8 py-3 rounded-full bg-indigo-600 text-white disabled:opacity-50"
        >
          {loading && action === "PUBLISHED" ? "Publishing..." : "Publish"}
        </button>

        {/* Draft */}
        <button
          disabled={loading}
          onClick={() => submit("DRAFT")}
          className="px-8 py-3 rounded-full border disabled:opacity-50"
        >
          {loading && action === "DRAFT" ? "Saving..." : "Save draft"}
        </button>
      </div>
    </section>
  );
}
