import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req,res) {''
    const data = await req.json();

    const Student = await Prisma.STUDENTS.create({
        data:{
            fullName : data?.fullName,
            rollNumber : data?.RollNumber,
            class : data?.class,
            contact : data?.contact
        }
    });
    return NextResponse(Student)
}