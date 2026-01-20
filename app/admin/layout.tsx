import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminNavbar />
      <main className="pt-16 px-6 pb-6 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
