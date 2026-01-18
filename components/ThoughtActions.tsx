"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";

export default function ThoughtActions({
  slug,
  initialLikes,
}: {
  slug: string;
  initialLikes: number;
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  async function handleLike() {
    setLiked((v) => !v);
    setLikes((v) => (liked ? v - 1 : v + 1));

    await fetch(`/api/thoughts/${slug}/like`, {
      method: "POST",
    });
  }

  function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: document.title,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied");
    }
  }

  return (
    <div className="sticky top-24 mb-2 flex gap-6 text-sm text-gray-500">
      <button
        onClick={handleLike}
        className="flex items-center gap-2 hover:text-black transition"
      >
        <Heart size={18} className={liked ? "fill-red-500 text-red-500" : ""} />
        {likes}
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-2 hover:text-black transition"
      >
        <Share2 size={18} />
        Share
      </button>
    </div>
  );
}
