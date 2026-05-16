-- CreateTable
CREATE TABLE "destination_reviews" (
    "id" SERIAL NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "destination_reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "destination_reviews" ADD CONSTRAINT "destination_reviews_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "tourist_destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
