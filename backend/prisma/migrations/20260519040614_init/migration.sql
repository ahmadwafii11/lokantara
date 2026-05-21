/*
  Warnings:

  - You are about to drop the column `user_id` on the `destination_reviews` table. All the data in the column will be lost.
  - You are about to drop the `user_sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "destination_reviews" DROP CONSTRAINT "destination_reviews_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_sessions" DROP CONSTRAINT "user_sessions_user_id_fkey";

-- AlterTable
ALTER TABLE "destination_reviews" DROP COLUMN "user_id";

-- DropTable
DROP TABLE "user_sessions";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "transport_stop_categories" (
    "id" SERIAL NOT NULL,
    "category_transport_stop" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transport_stop_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transport_stops" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "location" geography(Point, 4326) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transport_stops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportation_categories" (
    "id" SERIAL NOT NULL,
    "category_transport" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transportation_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportations" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "type" TEXT,
    "operator" TEXT,
    "description" TEXT,
    "capacity" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transportations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transport_stop_categories_category_transport_stop_key" ON "transport_stop_categories"("category_transport_stop");

-- CreateIndex
CREATE UNIQUE INDEX "transport_stops_slug_key" ON "transport_stops"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "transportation_categories_category_transport_key" ON "transportation_categories"("category_transport");

-- CreateIndex
CREATE UNIQUE INDEX "transportations_slug_key" ON "transportations"("slug");

-- AddForeignKey
ALTER TABLE "transport_stops" ADD CONSTRAINT "transport_stops_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "transport_stop_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transportations" ADD CONSTRAINT "transportations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "transportation_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
