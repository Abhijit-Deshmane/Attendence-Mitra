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

    const students = await prisma.student.findMany({
      where: { class: classe },
    });

    // STEP 2: get attendance for that month
    const attendance = await prisma.attendance.findMany({
      where: { date: month },
    });

    // STEP 3: LEFT JOIN manually
    const result = students.map((student) => {
      const att = attendance.find((a) => a.studentId === student.id);

      return {
        studentId: student.id,
        name: student.fullname,
        grade: student.class,

        attendanceId: att?.id || null,
        day: att?.day || null,
        date: att?.date || null,
        present: att?.present || null,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function POST(req,res) {
//   try {
//     const data = await req.json();
//     const result = await prisma.attendance.create({
//       data : {
//         studentId : data.studentId,
//         present: data.present,
//         day : data.day,
//         date: data.date
//       }
//     })
//     return NextResponse.json(result);
//   } catch (error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
export async function POST(req) {
  try {
    const data = await req.json();

    const day = parseInt(data?.day, 10);

    const result = await prisma.attendance.upsert({
      where: {
        studentId_date: {
          // Unique composite key
          studentId: data.studentId,
          date: data.date,
        },
      },
      update: {
        present: data.present,
        day: day,
      },
      create: {
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
  const studentId = searchParams.get("studentId");
  const date = searchParams.get("date");
  
  // day might be converted into the int this may be in the string
  const day = searchParams.get("day");
  console.log(day);
  const result = await prisma.attendance.delete({
    where :{
      studentId,
      date,
      day
    }
  })
   return NextResponse.json(result);
  
  } catch (error) {
     return NextResponse.json({ error: error.message }, { status: 500 });

  }
}