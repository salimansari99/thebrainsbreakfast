import Link from "next/link";
import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import { requireAdmin } from "@/lib/adminGaurd";

export default async function AdminDashboard() {
  // 🔐 Admin auth (session checked HERE)
  await requireAdmin();

  // 🔌 DB
  await connectDB();

  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [totalThoughts, thisMonth, likesAgg, scheduled] = await Promise.all([
    Thought.countDocuments(),

    Thought.countDocuments({
      createdAt: { $gte: startOfMonth },
    }),

    Thought.aggregate([
      { $match: { updatedAt: { $gte: startOfDay } } },
      { $group: { _id: null, total: { $sum: "$likes" } } },
    ]),

    Thought.countDocuments({
      status: "PUBLISHED",
      publishDate: { $gt: now },
    }),
  ]);

  const likesToday = likesAgg[0]?.total ?? 0;

  return (
    <section className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage your daily thoughts and content.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Thoughts" value={totalThoughts} />
        <StatCard title="This Month" value={thisMonth} />
        <StatCard title="Likes Today" value={likesToday} />
        <StatCard title="Scheduled" value={scheduled} />
      </div>

      <div className="flex gap-4">
        <Link
          href="/admin/new"
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white"
        >
          + Create New Thought
        </Link>

        <Link href="/thoughts" className="px-6 py-3 rounded-lg border">
          View Public Page
        </Link>
      </div>
    </section>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-semibold mt-2">{value}</p>
    </div>
  );
}
