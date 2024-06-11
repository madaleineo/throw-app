/*
  Warnings:

  - You are about to drop the column `booking_date` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `booking_time` on the `order` table. All the data in the column will be lost.
  - Added the required column `schedule_id` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "booking_date",
DROP COLUMN "booking_time",
ADD COLUMN     "schedule_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
