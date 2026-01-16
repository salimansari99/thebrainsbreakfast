import { Heart } from "lucide-react";

export function LikeButton({ liked }: { liked: boolean }) {
  return (
    <button className="flex items-center gap-2 text-sm">
      <Heart className={liked ? "fill-red-500 text-red-500" : ""} />
      Like
    </button>
  );
}
