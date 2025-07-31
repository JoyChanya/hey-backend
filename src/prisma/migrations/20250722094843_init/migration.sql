-- CreateEnum
CREATE TYPE "Source" AS ENUM ('facebook', 'tiktok', 'other');

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "rating" SMALLINT NOT NULL,
    "product" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "source" "Source",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Review_rating_idx" ON "Review"("rating");

-- CreateIndex
CREATE INDEX "Review_product_idx" ON "Review"("product");

-- CreateIndex
CREATE INDEX "Review_date_idx" ON "Review"("date");
