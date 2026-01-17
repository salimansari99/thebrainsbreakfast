import { Share2 } from "lucide-react";

export function ShareButtons() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("A thought worth reading");

  return (
    <div className="flex gap-4 text-sm">
      <a href={`https://wa.me/?text=${text}%20${url}`} target="_blank">
        WhatsApp
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
        target="_blank"
      >
        Twitter
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
      >
        LinkedIn
      </a>
    </div>
  );
}
