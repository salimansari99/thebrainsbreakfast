"use client";

import { Heart, Share2 } from "lucide-react";
import { useState } from "react";

export default function LikeShare() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex justify-center gap-6">
      <button
        onClick={() => setLiked(!liked)}
        className="flex items-center gap-2"
      >
        <Heart className={liked ? "fill-red-500 text-red-500" : ""} />
        Like
      </button>

      <button className="flex items-center gap-2">
        <Share2 />
        Share
      </button>
    </div>
  );
}
