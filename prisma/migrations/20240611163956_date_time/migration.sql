/*
  Warnings:

  - You are about to drop the column `date_time` on the `schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "date_time",
ADD COLUMN     "class_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "class_time" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP;
