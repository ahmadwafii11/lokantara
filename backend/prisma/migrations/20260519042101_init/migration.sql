/*
  Warnings:

  - Added the required column `region_id` to the `transport_stops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transport_stops" ADD COLUMN     "region_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "transport_stops" ADD CONSTRAINT "transport_stops_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
