/*
  Warnings:

  - Added the required column `City` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `District` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Street` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detail` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "City" TEXT NOT NULL,
ADD COLUMN     "District" TEXT NOT NULL,
ADD COLUMN     "Street" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "detail" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
