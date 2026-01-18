"use client";

import { useEffect, useRef, useState } from "react";
import ThoughtCard from "@/components/ThoughtCard";

const categories = ["All", "Life", "Motivation", "Success", "Tech"];
const PAGE_SIZE = 6;

type Thought = {
  id: string;
  category: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
  readTime?: string;
};

export default function ThoughtsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  /* =========================
     Debounce Search
  ========================== */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  /* =========================
     Reset on Filter Change
  ========================== */
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [activeCategory, debouncedQuery]);

  /* =========================
     Fetch Thoughts
  ========================== */
  useEffect(() => {
    if (loading) return;

    async function fetchThoughts() {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: PAGE_SIZE.toString(),
        });

        if (activeCategory !== "All") {
          params.append("category", activeCategory);
        }

        if (debouncedQuery) {
          params.append("q", debouncedQuery);
        }

        const res = await fetch(`/api/thoughts?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch thoughts");
        }

        const data = await res.json();

        setThoughts((prev) =>
          page === 1 ? data.thoughts : [...prev, ...data.thoughts],
        );
        setHasMore(data.hasMore);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchThoughts();

    return () => {
      abortRef.current?.abort();
    };
  }, [page, activeCategory, debouncedQuery]);

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      {/* =========================
          Header
      ========================== */}
      <header className="mb-16 space-y-8">
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
                className={`px-4 py-1.5 text-sm rounded-full transition
    focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
    ${
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

        {/* Result count */}
        <div className="h-5">
          <p className="text-sm text-gray-400">
            {thoughts.length} thought{thoughts.length !== 1 && "s"} loaded
          </p>
        </div>
      </header>

      {/* =========================
          Feed
      ========================== */}
      <div className="space-y-12">
        {thoughts.map((t) => (
          <ThoughtCard
            key={t.slug}
            slug={t.slug}
            title={t.title}
            excerpt={t.excerpt}
            category={t.category}
            date={t.date}
            imageUrl={t.imageUrl}
            readTime={t.readTime}
          />
        ))}

        {/* Loading */}
        <p
          className={`text-center text-sm text-gray-400 transition-opacity ${
            loading ? "opacity-100" : "opacity-0"
          }`}
        >
          Loading thoughts…
        </p>

        {/* Error */}
        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        {/* Empty */}
        {!loading && !error && thoughts.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            <p className="text-lg font-medium">No thoughts found</p>
            <p className="text-sm mt-2">Try a different keyword or category.</p>
          </div>
        )}
      </div>

      {/* =========================
          Load More
      ========================== */}
      {hasMore && (
        <button disabled={loading} onClick={() => setPage((p) => p + 1)}>
          Load more thoughts
        </button>
      )}
    </section>
  );
}
