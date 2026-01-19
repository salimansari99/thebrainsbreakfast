"use client";

import { useState } from "react";

type Props = {
  slug: string;
  initialFeatured: boolean;
};

export default function FeatureToggle({ slug, initialFeatured }: Props) {
  const [featured, setFeatured] = useState(initialFeatured);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    try {
      setLoading(true);

      const res = await fetch(`/api/admin/thoughts/${slug}/feature`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      const data = await res.json();
      setFeatured(data.featured);
    } catch {
      alert("Failed to update featured status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`text-sm font-medium transition ${
        featured
          ? "text-indigo-600"
          : "text-gray-500 hover:text-black dark:hover:text-white"
      }`}
    >
      {loading ? "Updating…" : featured ? "★ Featured" : "Set as Featured"}
    </button>
  );
}
