import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: { label: "User", type: "user" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.userName || !credentials?.password) {
          throw new Error("Nome de usuário e senha são obrigatórios!");
        }

        const user = await prisma.user.findUnique({
          where: { nameUser: credentials.userName },
        });

        if (!user) {
          throw new Error("Usuário não encontrado!");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Senha incorreta!");
        }

        return {
          id: user.id,
          nameUser: user.name,
          name: user.nameUser,
          email: user.email,
          image: user.image || "/default-avatar.png",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
