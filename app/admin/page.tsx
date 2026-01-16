import Link from "next/link";

export default function AdminDashboard() {
  return (
    <section className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage your daily thoughts and content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <StatCard title="Total Thoughts" value="124" />
        <StatCard title="This Month" value="12" />
        <StatCard title="Likes Today" value="89" />
        <StatCard title="Scheduled" value="3" />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          href="/admin/new"
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
        >
          + Create New Thought
        </Link>

        <Link
          href="/thoughts"
          className="px-6 py-3 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-900 transition"
        >
          View Public Page
        </Link>
      </div>
    </section>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white dark:bg-black p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-semibold mt-2">{value}</p>
    </div>
  );
}
