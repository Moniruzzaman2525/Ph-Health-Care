/*
  Warnings:

  - The `isBooked` column on the `doctor_schedules` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "doctor_schedules" DROP COLUMN "isBooked",
ADD COLUMN     "isBooked" BOOLEAN NOT NULL DEFAULT false;
