-- DropForeignKey
ALTER TABLE "destination_operating_hours" DROP CONSTRAINT "destination_operating_hours_destination_id_fkey";

-- CreateTable
CREATE TABLE "review_images" (
    "id" SERIAL NOT NULL,
    "review_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "destination_operating_hours" ADD CONSTRAINT "destination_operating_hours_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "tourist_destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_images" ADD CONSTRAINT "review_images_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "destination_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;
