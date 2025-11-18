import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// export async function GET(req) {
//   try {
//     const searchParams = req.nextUrl.searchParams;
//     const classe = searchParams.get("grade");
//     const month = searchParams.get("month");

//     // const result = await prisma.student.findMany({
//     //   where: {
//     //     class: classe,
//     //   },
//     //   include: {
//     //     attendance: {
//     //       where: {
//     //         // date: month,
//     //         // OR: [{ date: month }, { date: null }],
//     //           date: {
//     //       startsWith: month,
//     //           }

//     //       },
//     //       select: {
//     //         id: true,
//     //         date: true,
//     //         day: true,
//     //         present: true,
//     //       },
//     //     },
//     //   },
//     // });

//     //  const attendance = await prisma.attendance.findMany({
//     //   include: {
//     //     student: true,
//     //   },
//     //   orderBy: {
//     //     date: month,
//     //   },
//     // });

//     const students = await prisma.student.findMany({
//       where: { class: classe },
//     });

//     // STEP 2: get attendance for that month
//     const attendance = await prisma.attendance.findMany({
//       where: { date: month },
//     });

//     // STEP 3: LEFT JOIN manually
//     // const result = students.map((student) => {
//     //   const att = attendance.find((a) => a.studentId === student.id);

//     //   return {
//     //     studentId: student.id,
//     //     name: student.fullname,
//     //     grade: student.class,

//     //     attendanceId: att?.id || null,
//     //     day: att?.day || null,
//     //     date: att?.date || null,
//     //     present: att?.present || null,
//     //   };
//     // });
//     const result = students.map((student) => {
//   const att = attendance.filter((a) => a.studentId === student.id);

//   return {
//     studentId: student.id,
//     name: student.fullname,
//     grade: student.class,
//     attendance: att, // return full array
//   };
// });


//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

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
export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const classe = searchParams.get("grade");
    const month = searchParams.get("month"); // "11/2025"

    // STEP 1: Fetch all students of that class
    const students = await prisma.student.findMany({
      where: { class: classe },
    });

    // STEP 2: Fetch attendance for the selected month
    const attendance = await prisma.attendance.findMany({
      where: {
        date: month, // matches "MM/YYYY"
      },
    });

    // STEP 3: Get number of days in selected month
    const [mm, yyyy] = month.split("/");
    const daysInMonth = new Date(Number(yyyy), Number(mm), 0).getDate();

    // STEP 4: Merge student + attendance
    const result = students.map((student) => {
      const studentAttendance = attendance.filter(
        (a) => a.studentId === student.id
      );

      // Create dynamic days object (1 → daysInMonth)
      const days = {};
      for (let d = 1; d <= daysInMonth; d++) {
        days[d] = false;
      }

      // Fill attendance
      studentAttendance.forEach((a) => {
        days[a.day] = a.present;
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

// export async function DELETE(req) {
//   try {
//     const searchParams = req.nextUrl.searchParams;
//     const studentId = searchParams.get("studentId");
//     const date = searchParams.get("date");

//     // day might be converted into the int this may be in the string
//     const day = parseInt(searchParams.get("day"), 10);
//     console.log(day);
//     // const result = await prisma.attendance.delete({
//     //   where: {
//     //     studentId,
//     //     date,
//     //     day,
//     //   },
//     // });

//     const result = await prisma.attendance.deleteMany({
//   where: {
//     studentId,
//     date,
//     day,
//   },
// });

//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


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
