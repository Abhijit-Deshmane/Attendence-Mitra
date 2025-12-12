import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";

// const prisma = new PrismaClient();
import prisma from "@/lib/prisma";

export async function POST(req) {
   
  try {
    const { username, email, password } = await req.json();
     console.log({username,password,email})
    if (!username || !email || !password) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });

    if(user){
       console.log(user);
      

    }

    return NextResponse.json({ message: "User registered successfully" }, { status: 200});
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
