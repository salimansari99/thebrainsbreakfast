import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const thought = await Thought.findById(params.id);
  if (!thought) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(thought);
}
