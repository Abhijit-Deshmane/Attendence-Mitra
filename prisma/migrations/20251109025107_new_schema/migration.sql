/*
  Warnings:

  - You are about to drop the `Students` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Students";

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "rollNumber" INTEGER NOT NULL,
    "contact" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
