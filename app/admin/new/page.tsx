"use client";

import { useState } from "react";

const categories = ["Life", "Motivation", "Success", "Tech"];

export default function CreateThoughtPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Life");
  const [publishDate, setPublishDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 focus-within:border-indigo-500 transition">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write a clear, thoughtful title"
            className="w-full px-4 py-3 text-xl font-semibold bg-transparent placeholder-gray-400 focus:outline-none"
          />
        </div>

        <p className="text-xs text-gray-400">
          Titles work best when they are simple and specific.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-500">Content</label>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 focus-within:border-indigo-500 transition">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story..."
            rows={12}
            className="w-full px-5 py-4 text-lg leading-relaxed bg-transparent resize-none placeholder-gray-400 focus:outline-none"
          />
        </div>

        <p className="text-xs text-gray-400">
          Write naturally. You can format and polish later.
        </p>
      </div>

      {/* Meta */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Author</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Publish date</label>
          <input
            type="date"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-12 pb-8">
        <button className="px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition">
          Publish
        </button>

        <button
          type="button"
          className="px-8 py-3 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-900 transition"
        >
          Save draft
        </button>
      </div>
    </section>
  );
}
