import Link from "next/link";

export default function Home() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 space-y-24">
      {/* ===== Featured Story ===== */}
      <article className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <img
          src="https://media.istockphoto.com/id/1344939844/photo/hand-holding-drawing-virtual-lightbulb-with-brain-on-bokeh-background-for-creative-and-smart.jpg?s=1024x1024&w=is&k=20&c=fZi9_l3-fcMPHTEDVinuavkZnG9zh_bkX8lWjKVJsf4="
          alt="Featured"
          className="rounded-3xl object-cover w-full h-[280px] md:h-[360px]"
        />

        {/* Content */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
              Featured
            </span>
            <span className="text-gray-400">6 min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            Discipline Is the Bridge Between Goals and Accomplishment
          </h1>

          <p className="text-gray-500 text-lg">
            The quiet habits that separate those who dream from those who
            execute — and why consistency always wins.
          </p>

          <Link
            href="/thoughts/1"
            className="inline-block text-indigo-600 font-medium hover:underline"
          >
            Read full story →
          </Link>
        </div>
      </article>

      {/* ===== Divider ===== */}
      <div className="border-t dark:border-gray-800" />

      {/* ===== Feed ===== */}
      <section className="space-y-14">
        {[1, 2, 3].map((id) => (
          <article key={id} className="group flex gap-6 items-start">
            {/* Text */}
            <div className="flex-1 space-y-3">
              {/* Category */}
              <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                Motivation
              </span>

              <h2 className="text-2xl font-semibold leading-snug group-hover:underline">
                Build Systems, Not Goals
              </h2>

              <p className="text-gray-500 line-clamp-2">
                Goals are useful for direction, but systems are what actually
                create progress over time.
              </p>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>5 min read</span>
                <span>·</span>
                <span>Jan 2026</span>
              </div>
            </div>

            {/* Image */}
            <img
              src="https://media.istockphoto.com/id/1344939844/photo/hand-holding-drawing-virtual-lightbulb-with-brain-on-bokeh-background-for-creative-and-smart.jpg?s=1024x1024&w=is&k=20&c=fZi9_l3-fcMPHTEDVinuavkZnG9zh_bkX8lWjKVJsf4="
              alt=""
              className="w-32 h-24 md:w-40 md:h-28 rounded-xl object-cover flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </article>
        ))}
      </section>

      {/* ===== Call to Action ===== */}
      <div className="pt-12 flex justify-center">
        <Link
          href="/thoughts"
          className="px-8 py-3 rounded-full border text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
        >
          Explore all thoughts
        </Link>
      </div>
    </section>
  );
}
