-- AlterTable
ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "zipcode" DROP NOT NULL,
ALTER COLUMN "street_address1" DROP NOT NULL;

-- CreateTable
CREATE TABLE "availability" (
    "id" TEXT NOT NULL,
    "day" VARCHAR(10) NOT NULL,
    "time" DATE NOT NULL,
    "product_id" INTEGER NOT NULL,
    "num_spots" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "date_time" DATE NOT NULL,
    "availability_id" TEXT NOT NULL,
    "num_wheels_available" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "availability" ADD CONSTRAINT "availability_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_availability_id_fkey" FOREIGN KEY ("availability_id") REFERENCES "availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
