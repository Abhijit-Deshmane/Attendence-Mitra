-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "rollNumber" INTEGER NOT NULL,
    "contact" INTEGER,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);
