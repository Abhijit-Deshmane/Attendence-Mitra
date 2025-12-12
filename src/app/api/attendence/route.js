import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const classe = searchParams.get("grade");
    const month = searchParams.get("month"); // Example: "11/2025"

    // 1. Get students
    const students = await prisma.student.findMany({
      where: { class: classe },
    });

    // console.log(students)

    // 2. Get attendance of the month (safe matching)
    const attendance = await prisma.attendance.findMany({
      where: {
        date: {
          startsWith: month,
        },
      },
    });

    // 3. Calculate days in month
    const [mm, yyyy] = month.split("/");
    const daysInMonth = new Date(Number(yyyy), Number(mm), 0).getDate();

    // 4. Merge attendance with students
    const result = students.map((student) => {
      const studentAttendance = attendance.filter(
        (a) => a.studentId === student.id
      );

      const days = {};
      for (let d = 1; d <= daysInMonth; d++) {
        days[d] = false;
      }

      studentAttendance.forEach((a) => {
        days[Number(a.day)] = a.present;
      });

      return {
        studentId: student.id,
        rollNumber: student.rollNumber,
        name: student.fullname,
        class: student.class,
        attendance: studentAttendance,
        ...days,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Attendance Fetch Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const data = await req.json();

    const day = parseInt(data?.day, 10);

    const result = await prisma.attendance.create({
      data: {
        studentId: data.studentId,
        present: data.present,
        day: day,
        date: data.date,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const studentId = parseInt(searchParams.get("studentId"), 10);
    const date = searchParams.get("date");
    const day = parseInt(searchParams.get("day"), 10);

    if (!studentId || !date || isNaN(day)) {
  return NextResponse.json(
    { error: "Missing parameters" },
    { status: 400 }
  );
}


    const result = await prisma.attendance.deleteMany({
      where: {
        studentId,
        date,
        day,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
