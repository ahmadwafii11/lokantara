-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "regions" (
    "id" SERIAL NOT NULL,
    "region_name" VARCHAR(100),
    "region_type" VARCHAR(50),
    "province" VARCHAR(100),

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tourism_category" (
    "id" SERIAL NOT NULL,
    "category_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "tourism_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_operating_hours" (
    "id" SERIAL NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "open_time" TIME(0),
    "close_time" TIME(0),
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "is_24_hours" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "destination_operating_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tourist_destinations" (
    "id" SERIAL NOT NULL,
    "region_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "location" geography(Point, 4326),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tourist_destinations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tourist_destinations_slug_key" ON "tourist_destinations"("slug");

-- AddForeignKey
ALTER TABLE "destination_operating_hours" ADD CONSTRAINT "destination_operating_hours_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "tourist_destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tourist_destinations" ADD CONSTRAINT "tourist_destinations_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tourist_destinations" ADD CONSTRAINT "tourist_destinations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "tourism_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
