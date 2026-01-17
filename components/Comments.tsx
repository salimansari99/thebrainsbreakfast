"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

export default function Comments({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const [text, setText] = useState("");

  async function submit() {
    if (!session) {
      signIn();
      return;
    }

    await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    setText("");
  }

  return (
    <section className="mt-20 space-y-6">
      <h3 className="text-xl font-semibold">Comments</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a thoughtful response…"
        className="w-full rounded-xl border p-4"
      />

      <button
        onClick={submit}
        className="px-6 py-2 rounded-full bg-black text-white"
      >
        Respond
      </button>
    </section>
  );
}
