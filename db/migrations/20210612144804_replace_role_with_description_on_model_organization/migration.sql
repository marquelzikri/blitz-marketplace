/*
  Warnings:

  - You are about to drop the column `role` on the `Organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "role",
ADD COLUMN     "description" TEXT;

-- DropEnum
DROP TYPE "GlobalRole";
