
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// const prisma = new PrismaClient();

// POST → create new student
export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);
    const student = await prisma.student.create({
      data: {
        fullname: data?.fullName || "Unnamed Student",
        class: data?.class || "Unknown",
        rollNumber: parseInt(data?.rollNumber, 10),
        contact: data?.contact || null,
      },
    });
    console.log(student);
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET → fetch all students
export async function GET(req) {
  try {
    const result = await prisma.student.findMany();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing student ID" },
        { status: 400 }
      );
    }

    // 1️ Delete attendance linked to this student
    await prisma.attendance.deleteMany({
      where: {
        studentId: parseInt(id),
      },
    });

    // 2️ Delete the student
    const result = await prisma.student.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
