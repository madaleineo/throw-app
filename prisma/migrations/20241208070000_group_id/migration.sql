/*
  Warnings:

  - You are about to drop the `PotGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PotGroup" DROP CONSTRAINT "PotGroup_group_id_fkey";

-- DropForeignKey
ALTER TABLE "PotGroup" DROP CONSTRAINT "PotGroup_pot_id_fkey";

-- AlterTable
ALTER TABLE "Pot" ADD COLUMN     "group_id" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "PotGroup";
