/*
  Warnings:

  - You are about to drop the column `disciplineId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `disciplineId` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `disciplineId` on the `timetables` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `timetables` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[task,disciplineUserId]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[test,disciplineUserId]` on the table `tests` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `disciplineUserId` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disciplineUserId` to the `tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disciplineUserId` to the `timetables` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_userId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_userId_fkey";

-- DropForeignKey
ALTER TABLE "timetables" DROP CONSTRAINT "timetables_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "timetables" DROP CONSTRAINT "timetables_userId_fkey";

-- DropIndex
DROP INDEX "tasks_task_disciplineId_key";

-- DropIndex
DROP INDEX "tests_test_disciplineId_key";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "disciplineId",
DROP COLUMN "userId",
ADD COLUMN     "disciplineUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "disciplineId",
DROP COLUMN "userId",
ADD COLUMN     "disciplineUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "timetables" DROP COLUMN "disciplineId",
DROP COLUMN "userId",
ADD COLUMN     "disciplineUserId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "disciplinesUsers" (
    "id" SERIAL NOT NULL,
    "disciplineId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "disciplinesUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "disciplinesUsers_disciplineId_userId_key" ON "disciplinesUsers"("disciplineId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_task_disciplineUserId_key" ON "tasks"("task", "disciplineUserId");

-- CreateIndex
CREATE UNIQUE INDEX "tests_test_disciplineUserId_key" ON "tests"("test", "disciplineUserId");

-- AddForeignKey
ALTER TABLE "disciplinesUsers" ADD CONSTRAINT "disciplinesUsers_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplinesUsers" ADD CONSTRAINT "disciplinesUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetables" ADD CONSTRAINT "timetables_disciplineUserId_fkey" FOREIGN KEY ("disciplineUserId") REFERENCES "disciplinesUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_disciplineUserId_fkey" FOREIGN KEY ("disciplineUserId") REFERENCES "disciplinesUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_disciplineUserId_fkey" FOREIGN KEY ("disciplineUserId") REFERENCES "disciplinesUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
