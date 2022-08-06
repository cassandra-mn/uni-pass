-- DropForeignKey
ALTER TABLE "disciplines" DROP CONSTRAINT "disciplines_userId_fkey";

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
