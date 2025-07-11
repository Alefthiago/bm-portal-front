//    UTIL.   //
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSupportDTO } from "@/dtos/user.dto";
import AuthService from "@/services/authService";
import AppResponse from "@/utils/appResponse";
import { use } from "react";
//   /UTIL.   //

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
    credentials: {
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
          document: credentials.document.toString().replace(/\D/g, ""),
          type: credentials.type,
        }
      } else {
        const data: Record<string, string> = {
          login: credentials.login as string,
          password: credentials.password as string
        }

        //      VALIDAÇÃO DE DADOS DO USUÁRIO PARA LOGIN DE SUPORTE.        //
        const parse = LoginSupportDTO.safeParse(data);
        if (!parse.success) return null;

        const userExists: AppResponse = await AuthService.LoginSupport(data);
        if (!userExists.status) return null;
        //      /VALIDAÇÃO DE DADOS DO USUÁRIO PARA LOGIN DE SUPORTE.        //        

        return {
          id: userExists.data.login,
          type: userExists.data.accessLevel.name,
          permissions: userExists.data.accessLevel.permissions,
        }
      }
    }
  })],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.type = user.type;

        if ('permissions' in user) {
          token.permissions = user.permissions;
        }

        if (user.document) {
          token.document = user.document;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.type = token.type as string;

      if ('permissions' in token) {
        (session.user as { permissions?: string[] }).permissions = token.permissions as string[];
      }

      if (token.document) {
        (session.user as { document?: string }).document = token.document as string;
      }

      return session;
    },
  }
});