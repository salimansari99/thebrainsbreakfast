import Link from "next/link";
import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";

export const revalidate = 600; // ISR: revalidate every 10 mins

export default async function Home() {
  await connectDB();

  /* =========================
     1️⃣ Featured Thought
  ========================== */
  const featured = await Thought.findOne({
    status: "PUBLISHED",
    isFeatured: true,
  }).lean();

  // Fallback if none featured
  const fallbackFeatured = featured
    ? null
    : await Thought.findOne({
        status: "PUBLISHED",
      })
        .sort({ publishDate: -1 })
        .lean();

  const finalFeatured = featured ?? fallbackFeatured;

  /* =========================
     2️⃣ Feed (exclude featured)
  ========================== */
  const feed = await Thought.find({
    status: "PUBLISHED",
    publishDate: { $lte: new Date() },
    ...(finalFeatured?._id && { _id: { $ne: finalFeatured._id } }),
  })
    .sort({ publishDate: -1 })
    .limit(5)
    .lean();

  return (
    <section className="max-w-5xl mx-auto px-6 py-20 space-y-24">
      {/* ===== Featured Story ===== */}
      {finalFeatured && (
        <article className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src={finalFeatured.imageUrl}
            alt={finalFeatured.title}
            className="rounded-3xl object-cover w-full h-[280px] md:h-[360px]"
          />

          <div className="space-y-5">
            <div className="flex items-center gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                Featured
              </span>
              <span className="text-gray-400">Latest</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              {finalFeatured.title}
            </h1>

            <p className="text-gray-500 text-lg">{finalFeatured.excerpt}</p>

            <Link
              href={`/thoughts/${finalFeatured.slug}`}
              className="inline-block text-indigo-600 font-medium hover:underline"
            >
              Read full story →
            </Link>
          </div>
        </article>
      )}

      {/* ===== Divider ===== */}
      <div className="border-t dark:border-gray-800" />

      {/* ===== Feed ===== */}
      <section className="space-y-14">
        {feed.map((thought: any) => (
          <article
            key={thought._id.toString()}
            className="group flex gap-6 items-start"
          >
            <div className="flex-1 space-y-3">
              <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {thought.category}
              </span>

              <h2 className="text-2xl font-semibold group-hover:underline">
                <Link href={`/thoughts/${thought.slug}`}>{thought.title}</Link>
              </h2>

              <p
                className="text-gray-500 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: thought.excerpt }}
              ></p>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>
                  {new Date(thought.publishDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {thought.imageUrl && (
              <img
                src={thought.imageUrl}
                alt={thought.title}
                className="w-32 h-24 md:w-40 md:h-28 rounded-xl object-cover"
              />
            )}
          </article>
        ))}
      </section>

      {/* ===== CTA ===== */}
      <div className="pt-12 flex justify-center">
        <Link
          href="/thoughts"
          className="px-8 py-3 rounded-full border text-sm hover:bg-black hover:text-white transition"
        >
          Explore all thoughts
        </Link>
      </div>
    </section>
  );
}
