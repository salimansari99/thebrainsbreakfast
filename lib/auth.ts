import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/**
 * NextAuth configuration
 * Used by getServerSession(authOptions)
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    /**
     * Attach role to JWT
     */
    async jwt({ token, user }) {
      if (user) {
        // 🔒 Only your email becomes ADMIN
        token.role = user.email === process.env.ADMIN_EMAIL ? "ADMIN" : "USER";
      }
      return token;
    },

    /**
     * Expose role to session
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "ADMIN" | "USER";
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
