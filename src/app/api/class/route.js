import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// POST → create new class
export async function POST(req) {
  try {
    const data = await req.json();

    const cls = await prisma.class.create({
      data: {
        class : data?.class || "Ty"
      },
    });

    return NextResponse.json(cls, { status: 201 });
  } catch (error) {
    console.error("Error creating class", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const cls = await prisma.class.findMany();
    console.log(cls)
    return NextResponse.json(cls, { status: 201 });
  } catch (error) {
    console.error("Error Geting class", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}