"use server"

import CredentialsProvider from "next-auth/providers/credentials";
import { hash, compare } from "bcrypt";
import z from "zod";
import { AuthOptions } from "next-auth";
import prisma from "@repo/db/client";

const CredentialsSchema = z.object({
  phone: z.string().min(10).max(15),
  password: z.string(),
});

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"phone" | "password", string> | undefined) {
        const parsed = CredentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          throw new Error("Invalid credentials format");
        }

        if (!credentials) {
          throw new Error("Credentials are undefined");
        }

        const existingUser = await prisma.user.findFirst({
          where: { number: credentials.phone },
        });

        if (existingUser) {
          const passwordValidation = await compare(credentials.password, existingUser.password);
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number,
            };
          }
          return null;
        }

        try {
          const hashedPassword = await hash(credentials.password, 10);
          const user = await prisma.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }: { token: any; session: any }) {
      if (token) {
        session.user = { ...session.user, id: token.id };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: true, // Enable detailed logging
};
