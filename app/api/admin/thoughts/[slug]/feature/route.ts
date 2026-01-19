// app/api/admin/thoughts/[slug]/feature/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import { requireAdmin } from "@/lib/adminGaurd";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin();
    await connectDB();
    const { slug } = await params;

    const thought = await Thought.findOne({ slug });

    if (!thought) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // If already featured → unfeature
    if (thought.isFeatured) {
      thought.isFeatured = false;
      await thought.save();

      return NextResponse.json({ featured: false });
    }

    // Otherwise → make THIS the only featured post
    await Thought.updateMany(
      { isFeatured: true },
      { $set: { isFeatured: false } },
    );

    thought.isFeatured = true;
    await thought.save();

    return NextResponse.json({ featured: true });
  } catch (err: any) {
    if (err.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("FEATURE TOGGLE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
