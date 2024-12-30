import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          const user = await prisma.admin.findUnique({ where: { user: email } });
          if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
              return user;
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (error) {
          console.error('authorize: error', error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.adminlvl;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.adminlvl;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };