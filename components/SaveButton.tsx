"use client";

import { Bookmark } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

export function SaveButton({ thoughtId }: { thoughtId: string }) {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    if (!session) {
      signIn(); // 👈 correct
      return;
    }

    setSaved(!saved);
    await fetch(`/api/thoughts/${thoughtId}/save`, {
      method: "POST",
    });
  }

  return (
    <button onClick={handleSave}>
      <Bookmark className={saved ? "fill-black" : ""} />
      Save
    </button>
  );
}
