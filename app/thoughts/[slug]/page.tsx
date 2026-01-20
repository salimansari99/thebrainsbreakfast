export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import ThoughtActions from "@/components/ThoughtActions";

export default async function ThoughtPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();

  const thought = await Thought.findOne({
    slug: slug.toLowerCase(),
    status: "PUBLISHED",
  }).lean();

  if (!thought) {
    return (
      <div className="py-24 text-center text-gray-500">Thought not found</div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      {/* ================= Header ================= */}
      <header className="space-y-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
          {thought.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
            {(thought.author || "T")[0]}
          </div>

          {/* Meta */}
          <div className="text-sm text-gray-500">
            <p className="font-medium text-gray-800 dark:text-gray-300">
              {thought.author || "Thought of the Day"}
            </p>
            <p>
              {new Date(thought.publishDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              · 4 min read
            </p>
          </div>
        </div>
      </header>

      {/* ================= Sticky Actions ================= */}
      <div
        className="
           top-20 z-10 mb-4
          bg-white/80 dark:bg-black/80
          backdrop-blur
          border-y
        "
      >
        <div className="max-w-3xl mx-auto px-6 py-3">
          <ThoughtActions slug={thought.slug} initialLikes={thought.likes} />
        </div>
      </div>

      {/* ================= Cover Image ================= */}
      {thought.imageUrl && (
        <img
          src={thought.imageUrl}
          alt={thought.title}
          className="
        w-full
        h-[220px]
        md:h-[320px]
        rounded-2xl
        object-cover
        bg-gray-100
        dark:bg-gray-900"
        />
      )}

      {/* ================= Content ================= */}
      <div
        className="mt-8
          prose prose-lg dark:prose-invert
          max-w-none
          prose-p:leading-relaxed
          prose-headings:tracking-tight
        "
        dangerouslySetInnerHTML={{ __html: thought.content }}
      />
    </article>
  );
}
