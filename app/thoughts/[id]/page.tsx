export default function PostPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="space-y-6 mb-12">
        <h1 className="text-4xl font-semibold leading-tight">
          Discipline Is the Bridge Between Goals and Accomplishment
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>Abraham Lincoln</span>
          <span>·</span>
          <span>6 min read</span>
          <span>·</span>
          <span>Jan 15, 2026</span>
        </div>
      </header>

      {/* Cover Image */}
      <img
        src="https://media.istockphoto.com/id/1344939844/photo/hand-holding-drawing-virtual-lightbulb-with-brain-on-bokeh-background-for-creative-and-smart.jpg?s=1024x1024&w=is&k=20&c=fZi9_l3-fcMPHTEDVinuavkZnG9zh_bkX8lWjKVJsf4="
        className="rounded-2xl mb-12"
      />

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Discipline is not about restriction. It is about freedom. The freedom
          to execute, to persist, and to grow...
        </p>

        <h2>Why Discipline Beats Motivation</h2>

        <p>Motivation fades. Discipline stays. Systems outperform emotions.</p>

        <blockquote>
          You will never always be motivated, so you must learn to be
          disciplined.
        </blockquote>
      </div>
    </article>
  );
}
