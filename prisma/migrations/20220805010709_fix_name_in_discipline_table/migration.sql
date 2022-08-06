/*
  Warnings:

  - You are about to drop the column `name` on the `disciplines` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[discipline,userId]` on the table `disciplines` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discipline` to the `disciplines` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "disciplines_name_userId_key";

-- AlterTable
ALTER TABLE "disciplines" DROP COLUMN "name",
ADD COLUMN     "discipline" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_discipline_userId_key" ON "disciplines"("discipline", "userId");
