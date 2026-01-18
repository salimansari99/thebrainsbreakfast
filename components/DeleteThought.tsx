"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteThought({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);

    const res = await fetch(`/api/admin/thoughts/${slug}`, {
      method: "DELETE",
    });

    setLoading(false);

    if (res.ok) {
      setOpen(false);
      router.refresh(); // refresh admin list
    } else {
      alert("Failed to delete thought");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white dark:bg-black rounded-xl p-6 space-y-4 max-w-sm w-full">
            <h3 className="text-lg font-semibold">Delete thought?</h3>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="px-4 py-2 text-sm rounded border"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 text-sm rounded bg-red-600 text-white disabled:opacity-50"
              >
                {loading ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
