/*
  Warnings:

  - Added the required column `stock` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "stock" INTEGER NOT NULL;
