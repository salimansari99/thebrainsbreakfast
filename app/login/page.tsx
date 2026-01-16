"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-lg space-y-6"
      >
        <h1 className="text-3xl font-semibold text-center">Admin Login</h1>

        <p className="text-sm text-gray-500 text-center">
          Sign in to manage daily thoughts
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="w-full py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
        >
          Continue with Google
        </button>

        <p className="text-xs text-gray-400 text-center">
          Only authorized admins can access the dashboard
        </p>
      </motion.div>
    </div>
  );
}
