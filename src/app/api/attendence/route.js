import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const classe = searchParams.get("grade");
    const month = searchParams.get("month");

    // const result = await prisma.student.findMany({
    //   where: {
    //     class: classe,
    //   },
    //   include: {
    //     attendance: {
    //       where: {
    //         // date: month,
    //         // OR: [{ date: month }, { date: null }],
    //           date: {
    //       startsWith: month,
    //           }
          
    //       },
    //       select: {
    //         id: true,
    //         date: true,
    //         day: true,
    //         present: true,
    //       },
    //     },
    //   },
    // }); 




    //  const attendance = await prisma.attendance.findMany({
    //   include: {
    //     student: true,
    //   },
    //   orderBy: {
    //     date: month,
    //   },
    // });

    // // Flatten output for frontend
    // const result = attendance.map(a => ({
    //   attendanceId: a.id,
    //   present: a.present,
    //   day: a.day,
    //   date: a.date,
    //   studentId: a.student.id,
    //   fullname: a.student.fullname,
    //   class: a.student.class,
    //   rollNumber: a.student.rollNumber,
    // }));


 const students = await prisma.student.findMany({
      where: { class : classe }
    });

    // STEP 2: get attendance for that month
    const attendance = await prisma.attendance.findMany({
      where: { date: month }
    });

    // STEP 3: LEFT JOIN manually
    const result = students.map(student => {
      const att = attendance.find(a => a.studentId === student.id);

      return {
        studentId: student.id,
        name: student.name,
        grade: student.class,

        attendanceId: att?.id || null,
        day: att?.day || null,
        date: att?.date || null,
        present: att?.present || null
      };
    });



    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
