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
        id: user.data.role, // Tipo do usuário é passado como ID
        name: user.data.name,
        email: user.data.email,
      };
    }
  })],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
});