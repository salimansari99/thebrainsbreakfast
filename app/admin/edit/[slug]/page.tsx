import { connectDB } from "@/lib/db";
import Thought from "@/models/Thought";
import { requireAdmin } from "@/lib/adminGaurd";
import EditThoughtForm from "@/components/admin//EditThoughtForm";

export default async function EditThoughtPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAdmin();
  await connectDB();

  const { slug } = await params;

  const thought = await Thought.findOne({ slug }).lean();

  if (!thought) {
    return (
      <div className="py-20 text-center text-gray-500">Thought not found</div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Edit Thought</h1>
        <p className="text-gray-500 mt-1">
          Update content, category, or publishing details.
        </p>
      </div>

      <EditThoughtForm thought={JSON.parse(JSON.stringify(thought))} />
    </section>
  );
}
