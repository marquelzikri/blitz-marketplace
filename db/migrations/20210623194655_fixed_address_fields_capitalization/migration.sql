/*
  Warnings:

  - You are about to drop the column `City` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `District` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `Street` on the `Address` table. All the data in the column will be lost.
  - Added the required column `city` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "City",
DROP COLUMN "District",
DROP COLUMN "Street",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
