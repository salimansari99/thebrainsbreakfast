import Link from "next/link";

export default function Home() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 space-y-16">
      {/* Featured */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://media.istockphoto.com/id/1344939844/photo/hand-holding-drawing-virtual-lightbulb-with-brain-on-bokeh-background-for-creative-and-smart.jpg?s=1024x1024&w=is&k=20&c=fZi9_l3-fcMPHTEDVinuavkZnG9zh_bkX8lWjKVJsf4="
          className="rounded-2xl object-cover"
        />

        <div className="space-y-4">
          <span className="text-sm text-indigo-600 font-medium">Featured</span>
          <h1 className="text-4xl font-semibold leading-tight">
            Discipline Is the Bridge Between Goals and Accomplishment
          </h1>
          <p className="text-gray-500">
            The quiet habits that separate those who dream from those who
            execute.
          </p>
          <Link href="/thoughts/1" className="text-indigo-600 font-medium">
            Read more →
          </Link>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-12">
        {[1, 2, 3].map((id) => (
          <article key={id} className="flex gap-6 items-start">
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-semibold leading-snug">
                Build Systems, Not Goals
              </h2>
              <p className="text-gray-500 line-clamp-2">
                Goals are good for direction, but systems are best for
                progress...
              </p>
              <span className="text-sm text-gray-400">
                5 min read · Jan 2026
              </span>
            </div>

            <img
              src="https://media.istockphoto.com/id/1344939844/photo/hand-holding-drawing-virtual-lightbulb-with-brain-on-bokeh-background-for-creative-and-smart.jpg?s=1024x1024&w=is&k=20&c=fZi9_l3-fcMPHTEDVinuavkZnG9zh_bkX8lWjKVJsf4="
              className="w-40 h-28 rounded-lg object-cover"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
