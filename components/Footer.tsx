import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            The Brains Breakfast<span className="text-indigo-500">.</span>
          </h2>
          <p className="text-sm text-gray-500 max-w-xs">
            A daily pause for reflection. One meaningful thought, every single
            day.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
            Explore
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-indigo-500 transition">
                Today’s Thought
              </Link>
            </li>
            <li>
              <Link
                href="/thoughts"
                className="hover:text-indigo-500 transition"
              >
                All Thoughts
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-indigo-500 transition">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Meta */}
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
            About
          </p>
          <p className="text-sm text-gray-500">
            Built with focus, simplicity, and care.
          </p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} The Brains Breakfast.
            <br />
            All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>Made with intention ✨</span>
          <span>Designed for clarity, not noise</span>
        </div>
      </div>
    </footer>
  );
}
