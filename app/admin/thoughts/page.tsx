import Link from "next/link";
import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import { requireAdmin } from "@/lib/adminGaurd";
import { DeleteThought } from "@/components/DeleteThought";
import { PublishToggle } from "@/components/admin/PublishToggle";
import FeatureToggle from "@/components/admin/FeatureToggle";

export default async function AdminThoughts() {
  // 🔐 Protect admin page
  await requireAdmin();
  await connectDB();

  const thoughts = await Thought.find()
    .sort({ publishDate: -1, createdAt: -1 })
    .lean();

  return (
    <section className="space-y-10">
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Manage Thoughts</h1>
          <p className="text-gray-500 mt-1">
            Create, edit, publish, or remove thoughts.
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
        {thoughts.map((thought: any) => {
          const displayDate =
            thought.publishDate && thought.publishDate > new Date("2000-01-01")
              ? thought.publishDate
              : thought.createdAt;

          return (
            <div
              key={thought._id.toString()}
              className="p-4 rounded-xl border bg-white dark:bg-black flex items-center justify-between gap-6"
            >
              {/* Left */}
              <div className="min-w-0 space-y-1">
                <p className="font-medium truncate">{thought.title}</p>

                <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                  <span>
                    {new Date(displayDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>

                  <span>·</span>

                  <span className="capitalize">{thought.category}</span>

                  <span>·</span>

                  {/* Status */}
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      thought.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {thought.status}
                  </span>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4 text-sm shrink-0">
                <Link
                  href={`/thoughts/${thought.slug}`}
                  className="text-gray-500 hover:underline"
                >
                  View
                </Link>
                <FeatureToggle
                  slug={thought.slug}
                  initialFeatured={thought.isFeatured}
                />

                <Link
                  href={`/admin/edit/${thought.slug}`}
                  className="text-indigo-600 hover:underline"
                >
                  Edit
                </Link>
                <PublishToggle
                  slug={thought.slug}
                  initialStatus={thought.status}
                />

                <DeleteThought slug={thought.slug} />
              </div>
            </div>
          );
        })}

        {/* ================= Empty ================= */}
        {thoughts.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            <p className="text-lg font-medium">No thoughts yet</p>
            <p className="text-sm mt-2">
              Start by creating your first thought.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
