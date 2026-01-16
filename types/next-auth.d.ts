import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER";
      email?: string | null;
      name?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER";
  }
}
