-- CreateTable
CREATE TABLE "ticket_types" (
    "id" SERIAL NOT NULL,
    "ticket_type_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "ticket_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_ticket_prices" (
    "id" SERIAL NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "ticket_type_id" INTEGER NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "valid_from" DATE DEFAULT CURRENT_TIMESTAMP,
    "valid_until" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "destination_ticket_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_types_ticket_type_name_key" ON "ticket_types"("ticket_type_name");

-- CreateIndex
CREATE UNIQUE INDEX "destination_ticket_prices_destination_id_ticket_type_id_val_key" ON "destination_ticket_prices"("destination_id", "ticket_type_id", "valid_from");

-- AddForeignKey
ALTER TABLE "destination_ticket_prices" ADD CONSTRAINT "destination_ticket_prices_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "tourist_destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_ticket_prices" ADD CONSTRAINT "destination_ticket_prices_ticket_type_id_fkey" FOREIGN KEY ("ticket_type_id") REFERENCES "ticket_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
