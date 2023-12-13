/*
  Warnings:

  - A unique constraint covering the columns `[mentorID]` on the table `Mentor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentID]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Mentor_mentorID_key" ON "Mentor"("mentorID");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentID_key" ON "Student"("studentID");
