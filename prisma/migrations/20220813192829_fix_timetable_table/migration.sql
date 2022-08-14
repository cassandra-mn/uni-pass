/*
  Warnings:

  - You are about to drop the column `finalTime` on the `timetables` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `timetables` table. All the data in the column will be lost.
  - Added the required column `end` to the `timetables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `timetables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timetables" DROP COLUMN "finalTime",
DROP COLUMN "startTime",
ADD COLUMN     "end" TEXT NOT NULL,
ADD COLUMN     "start" TEXT NOT NULL;
