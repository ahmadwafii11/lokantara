import { Router } from "express"
import { prisma } from "../config/db"
import { equal } from "assert"

const router = Router()

// ROUTE ALL DESTINATIONS
router.get("/", async (req, res) => {

    const destinations =
        await prisma.touristDestination.findMany({
            include: {
                images: true,
                region: true,
                category: true,
            },
        })

    res.json(destinations)
})

// ROUTE CATEGORY FILTER
router.get(
    "/category/:filter",

    async (req, res) => {

        const { filter } = req.params

        const destinations =
            await prisma.touristDestination.findMany({

                where: {
                    category: {
                        categoryName: {
                            equals: filter,
                            mode: "insensitive",
                        },
                    },
                },

                include: {
                    images: true,
                    region: true,
                    category: true,
                },
            })

        res.json(destinations)
    }
)

export default router