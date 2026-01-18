import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  await connectDB();
  const { slug } = await params;

  const comments = await Comment.findOne({
    slug: slug.toLowerCase(),
    status: "PUBLISHED",
  }).lean();

  return NextResponse.json(comments);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { text } = await req.json();
  await connectDB();
  const { slug } = await params;
  const comment = await Comment.create({
    thoughtSlug: slug,
    text,
    user: {
      name: session.user.name,
      image: session.user.image,
    },
  });

  return NextResponse.json(comment);
}
