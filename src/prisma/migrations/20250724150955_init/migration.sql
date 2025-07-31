/*
  Warnings:

  - Changed the type of `productType` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('MOTOR', 'TRAVEL', 'ACCIDENT');

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "productType",
ADD COLUMN     "productType" "ProductType" NOT NULL;
