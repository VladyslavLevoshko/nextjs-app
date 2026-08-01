import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import type { AuthOptions } from "next-auth";

const SESSION_MAX_AGE = 60*60;

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: { label: "Email", type: "text" }, password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;
        const ok = await compare(credentials.password, user.passwordHash || "");
        if (!ok) return null;
        return {id: String(user.id)};
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id ?? token.sub;
      if (!token.iat) token.iat = Math.floor(Date.now() / 1000);
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = String(token.id);

      const tokenExp =
        token.exp ??
        (token.iat ? (Number(token.iat) + SESSION_MAX_AGE) : Math.floor(Date.now() / 1000) + SESSION_MAX_AGE);

      session.expires = new Date(Number(tokenExp) * 1000).toISOString();
      return session;
    },
  },
};