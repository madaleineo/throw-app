/*
  Warnings:

  - You are about to drop the column `booking_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `booking_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pot_booking` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cust_aq_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_cust_aq_id_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_type_id_fkey";

-- DropForeignKey
ALTER TABLE "pot_booking" DROP CONSTRAINT "pot_booking_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "pot_booking" DROP CONSTRAINT "pot_booking_pot_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "booking_id",
ADD COLUMN     "cust_aq_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "booking";

-- DropTable
DROP TABLE "booking_type";

-- DropTable
DROP TABLE "pot_booking";

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR(300),
    "category" VARCHAR(50) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "date_time" DATE NOT NULL,
    "user_id" INTEGER DEFAULT 0,
    "booking_date" TIMESTAMP(3) NOT NULL,
    "booking_time" TIMESTAMP(3) NOT NULL,
    "num_shared_wheels" INTEGER NOT NULL,
    "delivery" VARCHAR(30) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pot_order" (
    "order_id" INTEGER NOT NULL,
    "pot_id" INTEGER NOT NULL,

    CONSTRAINT "pot_order_id" PRIMARY KEY ("order_id","pot_id")
);

-- CreateTable
CREATE TABLE "order_detail" (
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,

    CONSTRAINT "product_order_id" PRIMARY KEY ("order_id","product_id")
);

-- AddForeignKey
ALTER TABLE "pot_order" ADD CONSTRAINT "pot_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pot_order" ADD CONSTRAINT "pot_order_pot_id_fkey" FOREIGN KEY ("pot_id") REFERENCES "pot"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_cust_aq_id_fkey" FOREIGN KEY ("cust_aq_id") REFERENCES "cust_aq"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
