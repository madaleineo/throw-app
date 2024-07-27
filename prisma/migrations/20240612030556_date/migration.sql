/*
  Warnings:

  - You are about to drop the column `class_time` on the `schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "class_time",
ALTER COLUMN "class_date" DROP DEFAULT,
ALTER COLUMN "class_date" SET DATA TYPE TIMESTAMP(3);
