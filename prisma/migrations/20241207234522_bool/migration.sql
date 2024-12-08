/*
  Warnings:

  - The `picked_up` column on the `Group` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `group_complete` column on the `Group` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "picked_up",
ADD COLUMN     "picked_up" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "group_complete",
ADD COLUMN     "group_complete" BOOLEAN NOT NULL DEFAULT false;
