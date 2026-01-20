import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";

// /api/thoughts
// /api/thoughts?category=Life
// /api/thoughts?category=life
// /api/thoughts?q=test
// /api/thoughts?category=Life&q=test

function calculateReadTime(text: string) {
  if (!text) return "1 min read";

  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(Number(searchParams.get("limit")) || 6, 20);

    const category = searchParams.get("category");
    const q = searchParams.get("q");

    const now = new Date();
    const MIN_DATE = new Date("2000-01-01"); // sanity lower bound

    /* =========================
       Query Builder (HARDENED)
    ========================== */
    const query: any = {
      status: "PUBLISHED",
      publishDate: {
        $gte: MIN_DATE,
        $lte: now,
      },
      $and: [],
    };

    // Category (case-insensitive)
    if (category && category !== "All") {
      query.$and.push({
        category: {
          $regex: `^${category}$`,
          $options: "i",
        },
      });
    }

    // Search (title + excerpt)
    if (q) {
      query.$and.push({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { excerpt: { $regex: q, $options: "i" } },
        ],
      });
    }

    // Clean up empty $and
    if (query.$and.length === 0) {
      delete query.$and;
    }

    /* =========================
       Fetch Data
    ========================== */
    const skip = (page - 1) * limit;

    const [rawThoughts, total] = await Promise.all([
      Thought.find(query)
        .sort({ publishDate: -1 })
        .skip(skip)
        .limit(limit)
        .select("title slug excerpt category imageUrl publishDate createdAt")
        .lean(),

      Thought.countDocuments(query),
    ]);

    const hasMore = skip + rawThoughts.length < total;

    /* =========================
       Normalize + Shape Response
    ========================== */
    const thoughts = rawThoughts.map((t: any) => {
      const safePublishDate =
        t.publishDate < MIN_DATE ? t.createdAt : t.publishDate;

      return {
        id: t._id.toString(),
        title: t.title,
        slug: t.slug,
        excerpt: t.excerpt,
        category: t.category,
        imageUrl: t.imageUrl,
        date: new Date(safePublishDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        readTime: calculateReadTime(t.excerpt),
      };
    });

    return NextResponse.json({
      thoughts,
      hasMore,
    });
  } catch (error) {
    console.error("THOUGHTS API ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch thoughts" },
      { status: 500 },
    );
  }
}
