import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  await connectDB();
  const { slug } = await params;

  const thought = await Thought.findOne({
    slug: slug.toLowerCase(),
    status: "PUBLISHED",
  }).lean();
  if (!thought) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(thought);
}
