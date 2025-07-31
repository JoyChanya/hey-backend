/*
  Warnings:

  - The `source` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('MOTOR', 'TRAVEL', 'ACCIDENT');

-- DropIndex
DROP INDEX "Review_date_idx";

-- DropIndex
DROP INDEX "Review_product_idx";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "productType" "ProductType" NOT NULL DEFAULT 'MOTOR',
ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "rating" SET DATA TYPE INTEGER,
DROP COLUMN "source",
ADD COLUMN     "source" TEXT;

-- DropEnum
DROP TYPE "Source";

-- CreateIndex
CREATE INDEX "Review_productType_idx" ON "Review"("productType");
