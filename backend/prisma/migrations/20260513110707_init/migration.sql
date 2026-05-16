-- CreateTable
CREATE TABLE "destination_images" (
    "id" SERIAL NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_thumbnail" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "destination_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "destination_images" ADD CONSTRAINT "destination_images_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "tourist_destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
