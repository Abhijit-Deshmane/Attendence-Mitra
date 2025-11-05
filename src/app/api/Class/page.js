import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req){
    // Query the data base to find the all the Classes Not completed yet
    const data = await Prisma.Class.findMany();
    return NextResponse.json(data);
    }
