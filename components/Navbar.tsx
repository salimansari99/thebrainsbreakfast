"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Today", href: "/" },
  { name: "Thoughts", href: "/thoughts" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 z-50 w-full transition-all ${
        scrolled
          ? "backdrop-blur bg-white/80 dark:bg-black/80 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-semibold text-lg tracking-tight">
          The Brains Breakfast<span className="text-indigo-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium"
              >
                {item.name}
                {active && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-indigo-500"
                  />
                )}
              </Link>
            );
          })}

          <ThemeToggle />

          {/* Auth Section */}
          {status === "loading" ? null : session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="flex items-center gap-2 text-sm"
              >
                {session.user?.image ? (
                  <img
                    src={session.user.image || "/user-avatar.png"}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User size={18} />
                )}
              </button>

              {userMenu && (
                <div
                  onClick={() => setUserMenu(!userMenu)}
                  className="absolute right-0 mt-3 w-48 rounded-xl border bg-white dark:bg-black shadow-lg p-2 text-sm"
                >
                  <Link
                    href="/me"
                    className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    Profile
                  </Link>

                  {session.user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
                    >
                      Admin
                    </Link>
                  )}

                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-full border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
            >
              <LogIn size={16} />
              Sign in
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-white dark:bg-black border-t"
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}

            <ThemeToggle />

            {/* Mobile Auth */}
            {session ? (
              <>
                <Link
                  href="/me"
                  onClick={() => setOpen(false)}
                  className="block text-sm"
                >
                  Profile
                </Link>

                {session.user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="block text-sm"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={() => signOut()}
                  className="text-sm text-left flex items-center gap-2"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="flex items-center gap-2 text-sm"
              >
                <LogIn size={16} />
                Sign in
              </button>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
