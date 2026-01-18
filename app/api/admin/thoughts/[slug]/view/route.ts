import { connectDB } from "@/lib/db";
import Analytics from "@/models/Analytics";
import Thought from "@/models/Thought";

export async function POST(
  _: Request,
  { params }: { params: { slug: string } },
) {
  await connectDB();

  const thought = await Thought.findOne({ slug: params.slug });
  if (!thought) return new Response(null, { status: 404 });

  const date = new Date().toISOString().slice(0, 10);

  await Analytics.findOneAndUpdate(
    { thoughtId: thought._id, date },
    { $inc: { views: 1 } },
    { upsert: true },
  );

  return new Response(null, { status: 204 });
}
