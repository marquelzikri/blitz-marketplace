-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "addressId" INTEGER;

-- AddForeignKey
ALTER TABLE "Membership" ADD FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
