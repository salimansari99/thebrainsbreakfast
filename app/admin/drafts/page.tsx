import Link from "next/link";
import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import { requireAdmin } from "@/lib/adminGaurd";
import { DeleteThought } from "@/components/DeleteThought";
import { PublishToggle } from "@/components/admin/PublishToggle";

export default async function AdminDraftsPage() {
  // 🔐 Protect admin page
  await requireAdmin();
  await connectDB();

  const drafts = await Thought.find({ status: "DRAFT" })
    .sort({ updatedAt: -1 })
    .lean();

  return (
    <section className="space-y-10">
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Drafts</h1>
          <p className="text-gray-500 mt-1">
            Unpublished thoughts you’re still working on.
          </p>
        </div>

        <Link
          href="/admin/new"
          className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition"
        >
          + New Thought
        </Link>
      </div>

      {/* ================= List ================= */}
      <div className="space-y-3">
        {drafts.map((draft: any) => {
          const lastEdited = draft.updatedAt || draft.createdAt;

          return (
            <div
              key={draft._id.toString()}
              className="p-4 rounded-xl border bg-white dark:bg-black flex items-center justify-between gap-6"
            >
              {/* Left */}
              <div className="min-w-0 space-y-1">
                <p className="font-medium truncate">
                  {draft.title || "Untitled Draft"}
                </p>

                <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                  <span>
                    Last edited{" "}
                    {new Date(lastEdited).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>

                  <span>·</span>

                  <span className="capitalize">
                    {draft.category || "General"}
                  </span>

                  <span>·</span>

                  <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                    DRAFT
                  </span>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4 text-sm shrink-0">
                <Link
                  href={`/admin/edit/${draft.slug}`}
                  className="text-indigo-600 hover:underline"
                >
                  Edit
                </Link>

                {/* Publish toggle */}
                <PublishToggle slug={draft.slug} initialStatus={draft.status} />

                {/* Delete */}
                <DeleteThought slug={draft.slug} />
              </div>
            </div>
          );
        })}

        {/* ================= Empty ================= */}
        {drafts.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            <p className="text-lg font-medium">No drafts</p>
            <p className="text-sm mt-2">All your thoughts are published 🎉</p>
          </div>
        )}
      </div>
    </section>
  );
}
