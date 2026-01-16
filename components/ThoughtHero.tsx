"use client";

import { motion } from "framer-motion";
import LikeShare from "./LikeShare";

export default function ThoughtHero({
  text,
  author,
}: {
  text: string;
  author?: string;
}) {
  const today = new Date().toDateString();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[80vh] flex items-center justify-center px-6"
    >
      <div className="max-w-3xl text-center space-y-8">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="px-4 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
            Thought of the Day · {today}
          </span>
        </div>

        {/* Quote */}
        <p className="text-3xl md:text-5xl font-light leading-relaxed">
          “{text}”
        </p>

        {/* Author */}
        {author && (
          <p className="text-gray-500 dark:text-gray-400">— {author}</p>
        )}

        {/* Actions */}
        <LikeShare />
      </div>
    </motion.section>
  );
}
