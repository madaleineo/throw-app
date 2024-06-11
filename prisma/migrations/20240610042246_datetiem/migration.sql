/*
  Warnings:

  - Changed the type of `time` on the `availability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "availability" DROP COLUMN "time",
ADD COLUMN     "time" TIME NOT NULL;
