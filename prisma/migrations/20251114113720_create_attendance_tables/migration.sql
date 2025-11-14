/*
  Warnings:

  - You are about to alter the column `fullname` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "fullname" SET DATA TYPE VARCHAR(100);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "present" BOOLEAN NOT NULL DEFAULT false,
    "day" INTEGER NOT NULL,
    "date" VARCHAR(20) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);
