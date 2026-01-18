"use client";

import Link from "next/link";

type ThoughtCardProps = {
  slug: string; // ✅ use slug
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl?: string;
  readTime?: string;
};

export default function ThoughtCard({
  slug,
  title,
  excerpt,
  date,
  category,
  imageUrl,
  readTime = "3 min read",
}: ThoughtCardProps) {
  return (
    <article className="group relative">
      <Link
        href={`/thoughts/${slug}`} // ✅ slug-based URL
        className="
          flex gap-6 items-start md:items-center
          focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
        "
      >
        {/* Text */}
        <div className="flex-1 space-y-4 min-w-0">
          <span
            className="inline-flex text-xs font-medium px-3 py-1 rounded-full
            bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            {category}
          </span>

          <h2
            className="text-2xl font-semibold leading-snug tracking-tight
            group-hover:underline underline-offset-4"
          >
            {title}
          </h2>

          <p className="text-gray-500 leading-relaxed line-clamp-2">
            {excerpt}
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>{date}</span>
            <span>·</span>
            <span>{readTime}</span>
          </div>
        </div>

        {/* Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="
              w-32 h-24 md:w-40 md:h-28
              rounded-xl object-cover flex-shrink-0
              transition-transform duration-300
              group-hover:scale-[1.03]
            "
          />
        )}
      </Link>

      <div className="mt-10 border-b dark:border-gray-800" />
    </article>
  );
}
