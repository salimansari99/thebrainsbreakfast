"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Today", href: "/" },
  { name: "Thoughts", href: "/thoughts" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          Thought<span className="text-indigo-500">.</span>
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
          exit={{ opacity: 0, height: 0 }}
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
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
