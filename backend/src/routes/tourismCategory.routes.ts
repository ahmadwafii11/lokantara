import { Router } from "express";
import { prisma } from "../config/db";

const router = Router();

router.get("/", async (req, res) => {
    const tourismCategory =
        await prisma.tourismCategory.findMany({
        })

    res.json(tourismCategory)
})

export default router;