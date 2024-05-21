/*
  Warnings:

  - You are about to drop the column `date` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `booking` table. All the data in the column will be lost.
  - Added the required column `date_time` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_cust_aq_id_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_user_id_fkey";

-- DropIndex
DROP INDEX "booking_type_id_key";

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "date_time" DATE NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "cust_aq_id" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "street_address1" DROP NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "zipcode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "booking_type" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pot" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "status_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "num_visits" SET DEFAULT 0,
ALTER COLUMN "student_job" DROP NOT NULL,
ALTER COLUMN "recent_visit" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_cust_aq_id_fkey" FOREIGN KEY ("cust_aq_id") REFERENCES "cust_aq"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
