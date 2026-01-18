import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import { requireAdmin } from "@/lib/adminGaurd";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  await connectDB();

  const thought = await Thought.findById(params.id);
  if (!thought) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  thought.status = thought.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

  if (thought.status === "PUBLISHED") {
    thought.publishDate = new Date();
  }

  await thought.save();

  return NextResponse.json(thought);
}
