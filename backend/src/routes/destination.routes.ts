import { Router } from "express"
import { prisma } from "../config/db"

const router = Router()

router.get("/", async (req, res) => {
    const destinations =
        await prisma.touristDestination.findMany({
            include: {
                images: true,
                region: true,
            },
        })

    res.json(destinations)
})

export default router