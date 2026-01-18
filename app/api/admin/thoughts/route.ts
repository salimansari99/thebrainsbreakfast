import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import { requireAdmin } from "@/lib/adminGaurd";
import { ThoughtSchema } from "@/lib/validators/thought";
import { slugify } from "@/lib/slugify";

export async function POST(req: Request) {
  try {
    /* =========================
       Auth (ADMIN only)
    ========================== */
    await requireAdmin();

    /* =========================
       Validate Input
    ========================== */
    const json = await req.json();
    const data = ThoughtSchema.parse(json);

    /* =========================
       DB Connection
    ========================== */
    await connectDB();

    /* =========================
       Slug Handling
    ========================== */
    const baseSlug = slugify(data.title);
    let slug = baseSlug;
    let count = 1;

    while (await Thought.exists({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    /* =========================
       Create Thought
    ========================== */
    const thought = await Thought.create({
      ...data,
      slug,
      status: data.publishDate ? "PUBLISHED" : "DRAFT",
      publishDate: data.publishDate ?? new Date(),
    });

    return NextResponse.json(thought, { status: 201 });
  } catch (error: any) {
    /* =========================
       Error Handling
    ========================== */

    // Zod validation error
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 },
      );
    }

    // Unauthorized
    if (error?.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Unknown / DB error
    console.error("ADMIN CREATE THOUGHT ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
