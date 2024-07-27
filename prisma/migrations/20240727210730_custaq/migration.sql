-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cust_aq_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cust_aq_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cust_aq_id_fkey" FOREIGN KEY ("cust_aq_id") REFERENCES "CustAq"("id") ON DELETE SET NULL ON UPDATE CASCADE;
