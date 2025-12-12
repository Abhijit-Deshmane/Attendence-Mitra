// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client";
// import { compare } from "bcrypt"; // we'll store hashed passwords

// const prisma = new PrismaClient();

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         username: { label: "Username", type: "text", required : true },
//         email: { label: "Email", type: "text", required : true },
//         password: { label: "Password", type: "password", required : true }
//       },
//       async authorize(credentials) {
        
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("All fields are required");
//         }

//         // Finding user in DB
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email }
//         });

//         if (!user){
//            throw new Error("User not found");
//            return Error("USer not found");

//         }
//         // Check password
//         const isValid = await compare(credentials.password, user.password);
//         if (!isValid){

//          throw new Error("Invalid credentials");
//          return null;
//         }  
//         return {
//           id: user.id,
//           username: user.username,
//           email: user.email
//         };
//       }
//     })
//   ],

// pages: {
//     signIn: "/auth/signin", // fallback in case of error
//   },


//   session: {
//     strategy: "jwt"
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks : {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.username = token.username;
//       session.user.email = token.email;
//       return session;
//     }
//   }
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };










// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import prisma from "@/lib/prisma";

// Avoid multiple PrismaClient instances in dev (Next.js hot reload)
// const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
          username: { label: "Username", type: "text", required : true },
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // Return an object that will be stored in the JWT
        return {
          id: user.id,
          name: user.username,
          email: user.email,
          image: user.image ?? null,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

