import Link from "next/link";

type ThoughtCardProps = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl?: string;
  readTime?: string;
};

export default function ThoughtCard({
  id,
  title,
  excerpt,
  date,
  category,
  imageUrl,
  readTime = "3 min read",
}: ThoughtCardProps) {
  return (
    <article className="group">
      <Link
        href={`/post/${id}`}
        className="flex gap-6 items-start md:items-center"
      >
        {/* Text Content */}
        <div className="flex-1 space-y-3">
          {/* Category Chip */}
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {category}
          </span>

          {/* Title */}
          <h2 className="text-2xl font-semibold leading-snug group-hover:underline">
            {title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-500 leading-relaxed line-clamp-2">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>{date}</span>
            <span>·</span>
            <span>{readTime}</span>
          </div>
        </div>

        {/* Thumbnail Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-32 h-24 md:w-40 md:h-28 rounded-lg object-cover flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        )}
      </Link>

      {/* Divider */}
      <div className="mt-10 border-b dark:border-gray-800" />
    </article>
  );
}
