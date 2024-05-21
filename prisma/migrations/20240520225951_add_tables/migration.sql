-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "booking_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "num_party" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status_id" INTEGER NOT NULL,

    CONSTRAINT "pot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pot_booking" (
    "booking_id" INTEGER NOT NULL,
    "pot_id" INTEGER NOT NULL,

    CONSTRAINT "pot_booking_id" PRIMARY KEY ("booking_id","pot_id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "account_open_date" TIMESTAMP(3) NOT NULL,
    "most_recent_visit_date" TIMESTAMP(3) NOT NULL,
    "num_visits" INTEGER NOT NULL,
    "street_address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "student_job" TEXT NOT NULL,
    "booking_id" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "booking_type_id_key" ON "booking"("type_id");

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "booking_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
