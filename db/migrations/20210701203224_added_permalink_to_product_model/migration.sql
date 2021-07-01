/*
  Warnings:

  - A unique constraint covering the columns `[permalink]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permalink` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "permalink" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product.permalink_unique" ON "Product"("permalink");
