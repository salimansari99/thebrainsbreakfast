"use client";

import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

type ThoughtCardProps = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl?: string;
  readTime?: string;
  initialLikes?: number;
  initialComments?: number;
  initiallyLiked?: boolean;
};

export default function ThoughtCard({
  id,
  title,
  excerpt,
  date,
  category,
  imageUrl,
  readTime = "3 min read",
  initialLikes = 0,
  initialComments = 0,
  initiallyLiked = false,
}: ThoughtCardProps) {
  const { data: session } = useSession();

  const [liked, setLiked] = useState(initiallyLiked);
  const [likes, setLikes] = useState(initialLikes);

  async function handleLike(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      signIn(); // or open login modal
      return;
    }

    // optimistic update
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));

    await fetch(`/api/thoughts/${id}/like`, {
      method: "POST",
    });
  }

  function handleCommentClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    // Navigate directly to comments section
    window.location.href = `/thoughts/${id}#comments`;
  }

  return (
    <article className="group">
      <Link
        href={`/thoughts/${id}`}
        className="flex gap-6 items-start md:items-center"
      >
        {/* Text Content */}
        <div className="flex-1 space-y-4">
          {/* Category */}
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

          {/* Meta + Actions */}
          <div className="flex items-center justify-between">
            {/* Meta */}
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>{date}</span>
              <span>·</span>
              <span>{readTime}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-5 text-sm text-gray-500">
              {/* Like */}
              <button
                onClick={handleLike}
                className="flex items-center gap-1 hover:text-red-500 transition"
              >
                <Heart
                  size={16}
                  className={liked ? "fill-red-500 text-red-500" : ""}
                />
                {likes}
              </button>

              {/* Comment */}
              {/* <button
                onClick={handleCommentClick}
                className="flex items-center gap-1 hover:text-black dark:hover:text-white transition"
              >
                <MessageCircle size={16} />
                {initialComments}
              </button> */}
            </div>
          </div>
        </div>

        {/* Image */}
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
