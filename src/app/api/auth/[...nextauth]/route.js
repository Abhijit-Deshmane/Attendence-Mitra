import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt"; // we'll store hashed passwords

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", required : true },
        email: { label: "Email", type: "text", required : true },
        password: { label: "Password", type: "password", required : true }
      },
      async authorize(credentials) {
        
        if (!credentials?.email || !credentials?.password) {
          return Response.json({messeage : "All fields are required"}, {status: 404});
        }

        // Finding user in DB
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) return Response.json({messeage : "Invalid Credantials"}, {status: 404});

        // Check password
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return Response.json({messeage : "Invalid Credentials"}, {status: 404});

        return {
          id: user.id,
          username: user.username,
          email: user.email
        };
      }
    })
  ],
  pages: {
    signIn: "/signin"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

