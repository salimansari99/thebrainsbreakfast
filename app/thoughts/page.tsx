"use client";

import { useState } from "react";
import ThoughtCard from "@/components/ThoughtCard";

const categories = ["All", "Life", "Motivation", "Success", "Tech"];

export default function ThoughtsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="mb-14 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            All Thoughts
          </h1>
          <p className="text-gray-500 text-lg">
            Reflections, ideas, and insights — written to be read slowly.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search thoughts..."
            className="w-full rounded-full border px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 flex-wrap pt-2">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
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
      </header>

      {/* Feed (Medium-style vertical rhythm) */}
      <div className="space-y-10">
        {[...Array(6)].map((_, i) => (
          <ThoughtCard
            key={i}
            id="1"
            category="Motivation"
            title="Your Comfort Zone Will Kill Your Dreams"
            excerpt="Growth begins the moment you step outside familiarity and embrace uncertainty..."
            date="Jan 14, 2026"
            imageUrl="https://media.istockphoto.com/id/1344939844/photo/hand-holding-drawing-virtual-lightbulb-with-brain-on-bokeh-background-for-creative-and-smart.jpg?s=1024x1024&w=is&k=20&c=fZi9_l3-fcMPHTEDVinuavkZnG9zh_bkX8lWjKVJsf4="
            readTime="4 min read"
          />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-20 flex justify-center">
        <button className="px-8 py-3 rounded-full border text-sm hover:bg-black hover:text-white transition">
          Load more thoughts
        </button>
      </div>
    </section>
  );
}
