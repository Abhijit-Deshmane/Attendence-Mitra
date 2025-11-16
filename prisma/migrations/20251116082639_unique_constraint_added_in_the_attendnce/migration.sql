/*
  Warnings:

  - A unique constraint covering the columns `[studentId,date,day]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attendance_studentId_date_day_key" ON "Attendance"("studentId", "date", "day");
