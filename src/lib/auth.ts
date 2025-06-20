//    UTIL.   //
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import UserModel from "@/models/userModel";
import { decrypt } from "@/utils/crypto";
//   /UTIL.   //

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
    credentials: {
      login: {},
      password: {}
    },
    authorize: async (credentials) => {
      if (!credentials?.login || !credentials?.password) return null;

      const user = await UserModel.getUserByLogin(credentials.login as string);
      if (!user) return null;

      const passwordDecrypted = decrypt(user.data.password, user.data.iv);
      if (passwordDecrypted !== credentials.password) return null;

      return {
        id: user.data.id,
        name: user.data.name,
        email: user.data.email,
        role: user.data.role
      };
    }
  })],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        // token.role = user.role as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        // session.user.role = token.role as string;
      }
      return session;
    }
  }
});