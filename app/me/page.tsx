import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <section className="max-w-3xl mx-auto px-6 py-20 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{session.user.name}</h1>
        <p className="text-gray-500">{session.user.email}</p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        <Stat label="Likes" value="42" />
        <Stat label="Saved" value="18" />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
