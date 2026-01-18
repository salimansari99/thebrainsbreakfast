import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import { requireAdmin } from "@/lib/adminGaurd";
import { ThoughtSchema } from "@/lib/validators/thought";
import { slugify } from "@/lib/slugify";

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> },
) {
  await connectDB();
  const { slug } = await context.params;

  const thought = await Thought.findOne({
    slug,
    status: "PUBLISHED",
  }).lean();

  if (!thought) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(thought);
}

/* =========================
   UPDATE THOUGHT
========================= */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin();
    await connectDB();

    const json = await req.json();
    const data = ThoughtSchema.parse(json);
    const { slug } = await params;

    const existing = await Thought.findOne({ slug });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    let newSlug = existing.slug;

    // 🔁 Regenerate slug only if title changed
    if (data.title !== existing.title) {
      const baseSlug = slugify(data.title);
      newSlug = baseSlug;
      let count = 1;

      while (
        await Thought.exists({
          slug: newSlug,
          _id: { $ne: existing._id },
        })
      ) {
        newSlug = `${baseSlug}-${count++}`;
      }
    }

    const updated = await Thought.findByIdAndUpdate(
      existing._id,
      {
        ...data,
        slug: newSlug,
      },
      { new: true },
    ).lean();

    return NextResponse.json(updated);
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 },
      );
    }

    if (error?.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("ADMIN UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/* =========================
   DELETE (SOFT DELETE READY)
========================= */
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin();
    await connectDB();

    // ✅ UNWRAP params
    const { slug } = await context.params;

    const thought = await Thought.findOne({ slug });

    if (!thought) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Soft delete (recommended)
    thought.status = "DRAFT";
    await thought.save();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
