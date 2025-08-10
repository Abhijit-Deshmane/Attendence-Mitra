const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function POST(req) {
  const { username, email, password } = await req.json();

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return Response.json(
      { message: "user created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in creating user", error);
    return Response.json(
      { message: "Error in creating user" },
      { status: 500 }
    );
  }
}
