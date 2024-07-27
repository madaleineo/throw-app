/*
  Warnings:

  - You are about to drop the `availability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cust_aq` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pot_order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "availability" DROP CONSTRAINT "availability_product_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_schedule_id_fkey";

-- DropForeignKey
ALTER TABLE "order_detail" DROP CONSTRAINT "order_detail_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_detail" DROP CONSTRAINT "order_detail_product_id_fkey";

-- DropForeignKey
ALTER TABLE "pot" DROP CONSTRAINT "pot_status_id_fkey";

-- DropForeignKey
ALTER TABLE "pot_order" DROP CONSTRAINT "pot_order_order_id_fkey";

-- DropForeignKey
ALTER TABLE "pot_order" DROP CONSTRAINT "pot_order_pot_id_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_availability_id_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_cust_aq_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_role_id_fkey";

-- DropTable
DROP TABLE "availability";

-- DropTable
DROP TABLE "cust_aq";

-- DropTable
DROP TABLE "order";

-- DropTable
DROP TABLE "order_detail";

-- DropTable
DROP TABLE "pot";

-- DropTable
DROP TABLE "pot_order";

-- DropTable
DROP TABLE "product";

-- DropTable
DROP TABLE "schedule";

-- DropTable
DROP TABLE "session";

-- DropTable
DROP TABLE "status";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "user_role";

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(100) NOT NULL,
    "created_at" DATE NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustAq" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "CustAq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR(300),
    "category" VARCHAR(50) NOT NULL,
    "duration" VARCHAR(50),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "date_time" DATE NOT NULL,
    "user_id" INTEGER DEFAULT 0,
    "schedule_id" INTEGER NOT NULL,
    "num_shared_wheels" INTEGER NOT NULL,
    "delivery" VARCHAR(30) NOT NULL,
    "name" VARCHAR(30) NOT NULL DEFAULT '',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pot" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(150),
    "glaze" INTEGER NOT NULL DEFAULT 1,
    "status_id" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotOrder" (
    "order_id" INTEGER NOT NULL,
    "pot_id" INTEGER NOT NULL,

    CONSTRAINT "pot_order_id" PRIMARY KEY ("order_id","pot_id")
);

-- CreateTable
CREATE TABLE "OrderDetail" (
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,

    CONSTRAINT "product_order_id" PRIMARY KEY ("order_id","product_id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" VARCHAR(100),
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthday" DATE NOT NULL,
    "num_visits" INTEGER NOT NULL DEFAULT 0,
    "city" VARCHAR(50),
    "state" VARCHAR(2),
    "zipcode" VARCHAR(10),
    "role_id" INTEGER NOT NULL DEFAULT 5,
    "gender" VARCHAR(50) NOT NULL,
    "student_job" VARCHAR(50),
    "cust_aq_id" INTEGER NOT NULL,
    "account_open" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recent_visit" DATE,
    "street_address1" VARCHAR(75),
    "street_address2" VARCHAR(75),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "day" VARCHAR(10) NOT NULL,
    "time" TIME NOT NULL,
    "product_id" INTEGER NOT NULL,
    "num_spots" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "class_date" TIMESTAMPTZ(3) NOT NULL,
    "availability_id" TEXT NOT NULL,
    "num_wheels_available" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pot" ADD CONSTRAINT "Pot_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotOrder" ADD CONSTRAINT "PotOrder_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotOrder" ADD CONSTRAINT "PotOrder_pot_id_fkey" FOREIGN KEY ("pot_id") REFERENCES "Pot"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cust_aq_id_fkey" FOREIGN KEY ("cust_aq_id") REFERENCES "CustAq"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_availability_id_fkey" FOREIGN KEY ("availability_id") REFERENCES "Availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
