"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  List,
  Quote,
  Heading2,
  Link as LinkIcon,
} from "lucide-react";

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Link.configure({ openOnClick: false }), Image],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg dark:prose-invert max-w-none min-h-[320px] focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  const btn =
    "flex items-center gap-1 rounded-md px-2 py-1 text-sm transition hover:bg-gray-100 dark:hover:bg-gray-800";

  const active =
    "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300";

  return (
    <div className="rounded-2xl border bg-white dark:bg-black overflow-hidden shadow-sm">
      {/* ===== Toolbar ===== */}
      <div className="flex flex-wrap items-center gap-1 border-b px-3 py-2 bg-gray-50 dark:bg-gray-900">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${btn} ${editor.isActive("bold") ? active : ""}`}
        >
          <Bold size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${btn} ${editor.isActive("italic") ? active : ""}`}
        >
          <Italic size={16} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${btn} ${
            editor.isActive("heading", { level: 2 }) ? active : ""
          }`}
        >
          <Heading2 size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${btn} ${editor.isActive("bulletList") ? active : ""}`}
        >
          <List size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${btn} ${editor.isActive("blockquote") ? active : ""}`}
        >
          <Quote size={16} />
        </button>

        <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-2" />

        <button
          onClick={() => {
            const url = prompt("Enter link URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`${btn} ${editor.isActive("link") ? active : ""}`}
        >
          <LinkIcon size={16} />
        </button>
      </div>

      {/* ===== Editor ===== */}
      <div className="p-6 bg-white dark:bg-black">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
