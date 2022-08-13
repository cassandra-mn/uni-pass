/*
  Warnings:

  - You are about to drop the column `day` on the `timetables` table. All the data in the column will be lost.
  - Added the required column `value` to the `timetables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timetables" DROP COLUMN "day",
ADD COLUMN     "value" TEXT NOT NULL,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "finalTime" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "Days";
