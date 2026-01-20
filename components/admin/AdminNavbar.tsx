"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle, Home, Menu, X } from "lucide-react";

const adminLinks = [
  { name: "Dashboard", href: "/admin" },
  { name: "Thoughts", href: "/admin/thoughts" },
  { name: "Drafts", href: "/admin/drafts" },
  // { name: "Analytics", href: "/admin/analytics" },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= Navbar ================= */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/90 dark:bg-black/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* ================= Left ================= */}
          <div className="flex items-center gap-6">
            {/* Brand */}
            <span className="font-semibold text-sm uppercase tracking-wider text-indigo-600">
              Admin
            </span>

            {/* Desktop Nav */}
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
                    {active && (
                      <span className="absolute -bottom-4 left-0 right-0 h-[2px] bg-indigo-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ================= Right ================= */}
          <div className="flex items-center gap-3">
            {/* Primary Action */}
            <Link
              href="/admin/new"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-sm"
            >
              <PlusCircle size={16} />
              New Thought
            </Link>

            {/* View Site */}
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white transition"
            >
              <Home size={16} />
              View Site
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= Mobile Drawer ================= */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 sm:hidden">
          <div className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-black p-6 shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-indigo-600 uppercase text-sm">
                Admin
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={18} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4">
              {adminLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm font-medium ${
                      active
                        ? "text-indigo-600"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="mt-auto pt-6 border-t dark:border-gray-800 flex flex-col gap-3">
              <Link
                href="/admin/new"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm"
              >
                <PlusCircle size={16} />
                New Thought
              </Link>

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 text-sm text-gray-500"
              >
                <Home size={16} />
                View Site
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
