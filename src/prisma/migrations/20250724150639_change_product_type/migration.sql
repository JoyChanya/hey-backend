/*
  Warnings:

  - Changed the type of `productType` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Sentiment" AS ENUM ('POSITIVE', 'NEGATIVE', 'NEUTRAL');

-- DropIndex
DROP INDEX "Review_productType_idx";

-- DropIndex
DROP INDEX "Review_rating_idx";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "sentiment" "Sentiment" NOT NULL DEFAULT 'NEUTRAL',
DROP COLUMN "productType",
ADD COLUMN     "productType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ProductType";
