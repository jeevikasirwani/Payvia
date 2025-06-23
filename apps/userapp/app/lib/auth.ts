import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {z} from zod;
import { NextAuthOptions,Session,User } from "next-auth";
import {JWT} from 'next-auth/jwt';
import session from 'next-auth';

const crediantialSchema=z.object({
    phone:z.string() .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long")
    .regex(/^\d+$/, "Phone number must contain only digits"),
    password:z.string().min(6,"Password must be at least 6 characters")
    .max(100,"Password too long")
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    }
  }
  
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
  }
}


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      
async authorize(credentials): Promise<User | null> {
        // Validate credentials exist
        if (!credentials?.phone || !credentials?.password) {
          return null;
        }

        // Zod validation
        try {
          const validatedCredentials = crediantialSchema.parse({
            phone: credentials.phone,
            password: credentials.password
          });

          const existingUser = await db.user.findFirst({
            where: {
              number: validatedCredentials.phone,
            },
          });

          if (existingUser) {
            // User exists - validate password
            const passwordValidation = await bcrypt.compare(
              validatedCredentials.password,
              existingUser.password
            );
            
            if (passwordValidation) {
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.number,
              };
            }
            return null;
          } else {
            // Create new user
            try {
              const hashedPassword = await bcrypt.hash(validatedCredentials.password, 10);
              
              const user = await db.user.create({
                data: {
                  number: validatedCredentials.phone,
                  password: hashedPassword,
                },
              });

              return {
                id: user.id.toString(),
                name: user.name,
                email: user.number,
              };
            } catch (e) {
              console.error("Error creating user:", e);
              return null;
            }
          }
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.error("Validation error:", error);
          } else {
            console.error("Authorization error:", error);
          }
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: { token: JWT; session: Session }): Promise<Session> {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    // signUp: '/auth/signup', // if you have a custom signup page
  },
  session: {
    strategy: "jwt",
  },
};