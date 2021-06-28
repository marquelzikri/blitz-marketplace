/*
  Warnings:

  - You are about to drop the column `variantId` on the `Rating` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_variantId_fkey";

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "variantId",
ADD COLUMN     "productId" INTEGER;

-- AddForeignKey
ALTER TABLE "Rating" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
