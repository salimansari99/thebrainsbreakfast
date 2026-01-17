"use client";

import { signIn } from "next-auth/react";

export default function LoginPromptModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-sm w-full space-y-6">
        <h2 className="text-xl font-semibold">Sign in to continue</h2>

        <p className="text-sm text-gray-500">
          Join to like, save, and engage with thoughtful writing.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => signIn("google")}
            className="flex-1 py-3 rounded-full bg-indigo-600 text-white"
          >
            Continue with Google
          </button>

          <button onClick={onClose} className="flex-1 py-3 rounded-full border">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
