import { Router } from "express";
import { prisma } from "../config/db";

const router = Router();

router.get("/", async (req, res) => {
    const transportStopCategory =
        await prisma.transportationCategory.findMany({
        })

    res.json(transportStopCategory)
})

export default router;