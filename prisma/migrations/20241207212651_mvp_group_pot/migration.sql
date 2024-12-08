/*
  Warnings:

  - You are about to drop the `OrderDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PotOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_order_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_product_id_fkey";

-- DropForeignKey
ALTER TABLE "PotOrder" DROP CONSTRAINT "PotOrder_order_id_fkey";

-- DropForeignKey
ALTER TABLE "PotOrder" DROP CONSTRAINT "PotOrder_pot_id_fkey";

-- DropTable
DROP TABLE "OrderDetail";

-- DropTable
DROP TABLE "PotOrder";

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "time_stamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" TEXT NOT NULL,
    "picked_up" INTEGER NOT NULL DEFAULT 0,
    "reminder_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotGroup" (
    "group_id" INTEGER NOT NULL,
    "pot_id" INTEGER NOT NULL,

    CONSTRAINT "pot_group_id" PRIMARY KEY ("group_id","pot_id")
);

-- AddForeignKey
ALTER TABLE "PotGroup" ADD CONSTRAINT "PotGroup_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotGroup" ADD CONSTRAINT "PotGroup_pot_id_fkey" FOREIGN KEY ("pot_id") REFERENCES "Pot"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
