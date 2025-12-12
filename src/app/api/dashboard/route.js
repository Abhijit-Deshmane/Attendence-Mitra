import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// const prisma = new PrismaClient();

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");
  const grade = searchParams.get("grade");

  // Prisma equivalent of your Drizzle query
  const result = await prisma.attendance.groupBy({
    by: ["day"],
    where: {
      date: date,
      student: {
        class: grade,
      },
    },
    _count: {
      day: true,
    },
    orderBy: {
      day: "desc",
    },
    take: 7,
  });

  // convert _count.day → presentCount
  const formatted = result.map((item) => ({
    day: item.day,
    presentCount: item._count.day,
  }));

  return NextResponse.json(formatted);
}
