"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  slug: string;
  initialStatus: "PUBLISHED" | "DRAFT";
};

export function PublishToggle({ slug, initialStatus }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isDraft = initialStatus === "DRAFT";

  async function handleToggle() {
    setLoading(true);

    const res = await fetch(`/api/admin/thoughts/${slug}/toggle`, {
      method: "POST",
    });

    setLoading(false);

    if (res.ok) {
      router.refresh(); // 🔄 refresh server components
    } else {
      alert("Failed to update status");
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`text-sm font-medium transition disabled:opacity-50 ${
        isDraft
          ? "text-green-600 hover:underline"
          : "text-yellow-600 hover:underline"
      }`}
    >
      {loading ? "Updating…" : isDraft ? "Publish" : "Unpublish"}
    </button>
  );
}
