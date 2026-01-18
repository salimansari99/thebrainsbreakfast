// app/api/admin/thoughts/[slug]/toggle/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import { requireAdmin } from "@/lib/adminGaurd";

export async function POST(
  _req: Request,
  context: { params: Promise<{ slug: string }> },
) {
  await requireAdmin();
  await connectDB();

  // ✅ unwrap params
  const { slug } = await context.params;

  const thought = await Thought.findOne({ slug });

  if (!thought) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  thought.status = thought.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
  await thought.save();

  return NextResponse.json({ status: thought.status });
}
