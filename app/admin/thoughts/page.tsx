import Link from "next/link";

export default function AdminThoughts() {
  const thoughts = [
    { id: 1, text: "Consistency beats motivation.", date: "Jan 15, 2026" },
  ];

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-semibold">Manage Thoughts</h1>

      <div className="space-y-4">
        {thoughts.map((t) => (
          <div
            key={t.id}
            className="p-4 rounded-lg border bg-white dark:bg-black flex justify-between items-center"
          >
            <div>
              <p className="font-medium line-clamp-1">{t.text}</p>
              <p className="text-sm text-gray-500">{t.date}</p>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/admin/edit/${t.id}`}
                className="text-indigo-600 text-sm"
              >
                Edit
              </Link>
              <button className="text-red-500 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
