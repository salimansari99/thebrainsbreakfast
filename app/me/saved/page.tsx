import ThoughtCard from "@/components/ThoughtCard";

export default function SavedPostsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 space-y-12">
      <h1 className="text-3xl font-semibold">Saved for later</h1>

      <div className="space-y-10">
        <ThoughtCard
          id="1"
          title="Discipline Beats Motivation"
          slug="discipline-beats-motivation"
          excerpt="Motivation fades. Systems stay."
          date="Jan 12, 2026"
          category="Life"
          readTime="4 min read"
        />
      </div>
    </section>
  );
}
