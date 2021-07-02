-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "addressId" INTEGER;

-- AddForeignKey
ALTER TABLE "Organization" ADD FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
