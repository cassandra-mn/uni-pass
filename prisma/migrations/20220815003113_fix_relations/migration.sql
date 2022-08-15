-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_disciplineUserId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_disciplineUserId_fkey";

-- DropForeignKey
ALTER TABLE "timetables" DROP CONSTRAINT "timetables_disciplineUserId_fkey";

-- AddForeignKey
ALTER TABLE "timetables" ADD CONSTRAINT "timetables_disciplineUserId_fkey" FOREIGN KEY ("disciplineUserId") REFERENCES "disciplinesUsers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_disciplineUserId_fkey" FOREIGN KEY ("disciplineUserId") REFERENCES "disciplinesUsers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_disciplineUserId_fkey" FOREIGN KEY ("disciplineUserId") REFERENCES "disciplinesUsers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
