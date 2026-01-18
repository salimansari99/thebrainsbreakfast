import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import { NextResponse } from "next/server";

export async function POST(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { slug } = await params;

  const thought = await Thought.findOne({
    slug: slug.toLowerCase(),
    status: "PUBLISHED",
  }).lean();
  if (!thought) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const userEmail = session.user.email;

  const alreadyLiked = thought.likedBy.includes(userEmail);

  if (alreadyLiked) {
    thought.likes -= 1;
    thought.likedBy = thought.likedBy.filter(
      (email: string) => email !== userEmail,
    );
  } else {
    thought.likes += 1;
    thought.likedBy.push(userEmail);
  }

  await thought.save();

  return NextResponse.json({
    liked: !alreadyLiked,
    likes: thought.likes,
  });
}
