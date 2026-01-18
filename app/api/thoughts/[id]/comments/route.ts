import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const comments = await Comment.find({ thoughtId: params.id }).sort({
    createdAt: -1,
  });

  return NextResponse.json(comments);
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { text } = await req.json();
  await connectDB();

  const comment = await Comment.create({
    thoughtId: params.id,
    text,
    user: {
      name: session.user.name,
      image: session.user.image,
    },
  });

  return NextResponse.json(comment);
}
