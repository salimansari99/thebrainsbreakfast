"use client";

import { Heart } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

export function LikeButton({
  thoughtId,
  initialLiked,
}: {
  thoughtId: string;
  initialLiked: boolean;
}) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(initialLiked);

  async function handleLike() {
    if (!session) {
      signIn(); // 👈 CORRECT usage
      return;
    }

    setLiked(!liked); // optimistic UI

    await fetch(`/api/thoughts/${thoughtId}/like`, {
      method: "POST",
    });
  }

  return (
    <button onClick={handleLike} className="flex items-center gap-2 text-sm">
      <Heart className={liked ? "fill-red-500 text-red-500" : ""} />
      Like
    </button>
  );
}
