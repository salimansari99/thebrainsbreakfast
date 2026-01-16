"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle, Home } from "lucide-react";

const adminLinks = [
  { name: "Dashboard", href: "/admin" },
  { name: "New Thought", href: "/admin/new" },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-black border-b">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-6">
          <span className="font-semibold text-sm uppercase tracking-wide text-indigo-600">
            Admin Panel
          </span>

          {adminLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${
                  active
                    ? "font-semibold text-black dark:text-white"
                    : "text-gray-500"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/new"
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition"
          >
            <PlusCircle size={16} />
            Add Thought
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white"
          >
            <Home size={16} />
            View Site
          </Link>
        </div>
      </div>
    </nav>
  );
}
