import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Augmenta o tipo Session
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      type?: string;
      document?: string;
      permissions?: string[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: string;
    type?: string;
    document?: string;
    permissions?: string[];
  }
}

// Augmenta o tipo JWT
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    type?: string;
    document?: string;
    permissions?: string[];
  }
}