-- DropForeignKey
ALTER TABLE "disciplinesUsers" DROP CONSTRAINT "disciplinesUsers_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "disciplinesUsers" DROP CONSTRAINT "disciplinesUsers_userId_fkey";

-- AddForeignKey
ALTER TABLE "disciplinesUsers" ADD CONSTRAINT "disciplinesUsers_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplinesUsers" ADD CONSTRAINT "disciplinesUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
