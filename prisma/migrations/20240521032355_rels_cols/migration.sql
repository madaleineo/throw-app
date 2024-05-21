/*
  Warnings:

  - You are about to drop the column `date_time` on the `booking` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `phone` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(12)`.
  - You are about to alter the column `name` on the `booking_type` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `description` on the `booking_type` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `name` on the `pot` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `description` on the `pot` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `token` on the `session` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `status` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `account_open_date` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `most_recent_visit_date` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `street_address` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `first_name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `last_name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `city` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `state` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2)`.
  - You are about to alter the column `zipcode` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `gender` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `student_job` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name` on the `user_role` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cust_aq_id` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_address1` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_open` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recent_visit` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_address1` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" DROP COLUMN "date_time",
ADD COLUMN     "city" VARCHAR(50) NOT NULL,
ADD COLUMN     "cust_aq_id" INTEGER NOT NULL,
ADD COLUMN     "date" DATE NOT NULL,
ADD COLUMN     "delivery" VARCHAR(30) NOT NULL,
ADD COLUMN     "state" VARCHAR(2) NOT NULL,
ADD COLUMN     "street_address1" VARCHAR(75) NOT NULL,
ADD COLUMN     "street_address2" VARCHAR(75),
ADD COLUMN     "time" DATE NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "zipcode" VARCHAR(10) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(12);

-- AlterTable
ALTER TABLE "booking_type" ALTER COLUMN "name" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "pot" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(150);

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "token" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "created_at" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "status" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "user" DROP COLUMN "account_open_date",
DROP COLUMN "most_recent_visit_date",
DROP COLUMN "street_address",
ADD COLUMN     "account_open" DATE NOT NULL,
ADD COLUMN     "recent_visit" DATE NOT NULL,
ADD COLUMN     "street_address1" VARCHAR(75) NOT NULL,
ADD COLUMN     "street_address2" VARCHAR(75),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "last_name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "birthday" SET DATA TYPE DATE,
ALTER COLUMN "city" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "state" SET DATA TYPE VARCHAR(2),
ALTER COLUMN "zipcode" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "role_id" SET DEFAULT 5,
ALTER COLUMN "gender" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "student_job" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "user_role" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- CreateTable
CREATE TABLE "cust_aq" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "cust_aq_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_cust_aq_id_fkey" FOREIGN KEY ("cust_aq_id") REFERENCES "cust_aq"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pot" ADD CONSTRAINT "pot_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pot_booking" ADD CONSTRAINT "pot_booking_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pot_booking" ADD CONSTRAINT "pot_booking_pot_id_fkey" FOREIGN KEY ("pot_id") REFERENCES "pot"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
