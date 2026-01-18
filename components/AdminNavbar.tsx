"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle, Home } from "lucide-react";

const adminLinks = [
  { name: "Dashboard", href: "/admin" },
  { name: "Thoughts", href: "/admin/thoughts" },
  { name: "Drafts", href: "/admin/drafts" },
  { name: "Analytics", href: "/admin/analytics" },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/90 dark:bg-black/80 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* ================= Left ================= */}
        <div className="flex items-center gap-10">
          {/* Brand */}
          <span className="font-semibold text-sm uppercase tracking-wider text-indigo-600">
            Admin
          </span>

          {/* Nav Links */}
          <div className="hidden sm:flex items-center gap-6">
            {adminLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition ${
                    active
                      ? "text-black dark:text-white"
                      : "text-gray-500 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {link.name}

                  {/* Active underline */}
                  {active && (
                    <span className="absolute -bottom-4 left-0 right-0 h-[2px] bg-indigo-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ================= Right ================= */}
        <div className="flex items-center gap-4">
          {/* Primary Action */}
          <Link
            href="/admin/new"
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-sm"
          >
            <PlusCircle size={16} />
            <span className="hidden sm:inline">New Thought</span>
          </Link>

          {/* View Site */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white transition"
          >
            <Home size={16} />
            <span className="hidden sm:inline">View Site</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
