//    UTIL.   //
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSupportDTO } from "@/dtos/user.dto";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import AuthService from "@/services/authService";
// import UserModel from "@/models/userModel";
// import { decrypt } from "@/utils/crypto";
//   /UTIL.   //

type MyUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  document?: string;
};

type MyToken = {
  id?: string;
  document?: string;
} & JWT;

type MySession = {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    document?: string;
  };
} & Session;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
    credentials: {
      // login: {},
      // password: {}
      login: {},
      password: {},
      document: {},
      type: {},
    },
    authorize: async (credentials) => {
      if (!credentials) return null;

      if (credentials.type === "client") {
        if (!credentials?.login || !credentials?.document) return null;
        return {
          id: credentials.login.toString().replace(/\D/g, ""),
          document: credentials.document.toString().replace(/\D/g, "")
        }
      } else if (credentials.type === "employee") {
        const data: Record<string, string> = {
          login: credentials.login as string,
          password: credentials.password as string
        }
        //      VALIDAÇÃO DE DADOS DO USUÁRIO PARA LOGIN DE SUPORTE.        //
        const parse = LoginSupportDTO.safeParse(data);
        if (!parse.success) return null;
        const userExists = await AuthService.LoginSupport(data);
        //      /VALIDAÇÃO DE DADOS DO USUÁRIO PARA LOGIN DE SUPORTE.        //        
        if (!userExists.status) return null;
        return {
          id: userExists.data.id
        };
      } else {
        // Handle other types if necessary
        return null;
      }
    }
  })],
  callbacks: {
    async jwt({ token, user }) {
      const typedToken = token as MyToken;

      if (user) {
        const typedUser = user as MyUser;
        typedToken.id = typedUser.id;
        if (typedUser.document) {
          typedToken.document = typedUser.document;
        }
        // typedToken.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      }

      return typedToken;
    },

    async session({ session, token }) {
      const typedSession = session as MySession;
      const typedToken = token as MyToken;

      if (typedToken) {
        typedSession.user.id = typedToken.id;
        if (typedToken.document) {
          typedSession.user.document = typedToken.document;
        }
      }

      return typedSession;
    }
  }
});