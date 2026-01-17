import { Heart, MessageCircle, Share2 } from "lucide-react";

export default function ThoughtPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="space-y-6 mb-6">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
          Discipline Is the Bridge Between Goals and Accomplishment
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Abraham Lincoln
          </span>
          <span>·</span>
          <span>6 min read</span>
          <span>·</span>
          <span>Jan 15, 2026</span>
        </div>
      </header>

      {/* Actions (AFTER HEADER) */}
      <div className="flex items-center gap-6 text-sm text-gray-500 mb-12">
        <ActionButton icon={<Heart size={18} />} label="124" />
        {/* <ActionButton icon={<MessageCircle size={18} />} label="12" /> */}
        <ActionButton icon={<Share2 size={18} />} />
      </div>

      {/* Cover Image */}
      <img
        src="https://media.istockphoto.com/id/1344939844/photo/hand-holding-drawing-virtual-lightbulb-with-brain-on-bokeh-background-for-creative-and-smart.jpg?s=1024x1024&w=is&k=20&c=fZi9_l3-fcMPHTEDVinuavkZnG9zh_bkX8lWjKVJsf4="
        alt="Cover"
        className="rounded-2xl mb-14 w-full object-cover"
      />

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Discipline is not about restriction. It is about freedom. The freedom
          to execute, to persist, and to grow even when motivation fades.
        </p>

        <h2>Why Discipline Beats Motivation</h2>

        <p>
          Motivation is emotional. Discipline is structural. Systems outperform
          feelings over the long run.
        </p>

        <blockquote>
          You will never always be motivated, so you must learn to be
          disciplined.
        </blockquote>

        <p>
          The most successful people aren’t superhuman — they simply build
          habits that remove the need for motivation.
        </p>
      </div>

      {/* Divider */}
      <div className="mt-20 border-t dark:border-gray-800" />

      {/* Comments */}
      {/* <section id="comments" className="mt-16">
        <h3 className="text-2xl font-semibold mb-6">Responses</h3>

        <p className="text-gray-500">Sign in to share your thoughts.</p>
      </section> */}
    </article>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label?: string;
}) {
  return (
    <button className="flex items-center gap-2 hover:text-black dark:hover:text-white transition">
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
}
