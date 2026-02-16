// ...existing code...
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import type { AuthOptions } from "next-auth";

const SESSION_MAX_AGE = 60*60*60 // seconds (currently 1 hour)

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
        return { id: String(user.id), email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE,
  },
  jwt: {
    maxAge: SESSION_MAX_AGE,
  },
  // ...existing code...
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) (token as any).id = (user as any).id ?? token.sub;
      // убедимся, что есть iat (issued at)
      if (!(token as any).iat) (token as any).iat = Math.floor(Date.now() / 1000);
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      (session.user as any).id = (token as any).id;

      const maxAge = SESSION_MAX_AGE;
      const tokenExp =
        (token as any).exp ??
        ((token as any).iat ? (Number((token as any).iat) + maxAge) : Math.floor(Date.now() / 1000) + maxAge);

      session.expires = new Date(Number(tokenExp) * 1000).toISOString();
      return session;
    },
  },
// ...existing code...
};