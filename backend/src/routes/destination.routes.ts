import { Router } from "express"
import { prisma } from "../config/db"
import { equal } from "assert"
import { Request, Response } from "express"

import { uploadReview } from "../middlewares/uploadReviews"

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

// API Slug Destinations
router.get("/:slug", async (req, res) => {
    const { slug } = req.params

    const destination =
        await prisma.touristDestination.findUnique({
            where: {
                slug,
            },

            include: {
                images: true,
                region: true,
                category: true,

                operatingHours: true,

                destinationTicketPrices: {
                    include: {
                        ticketType: true,
                    },
                },

                reviews: {
                    include: {
                        image: true
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        })

    res.json(destination)
})

// API POST REVIEWS 
router.post("/:slug/reviews", uploadReview.array("images", 5), async (req: Request<{ slug: string }>, res) => {
        const { slug } = req.params
        const { username, comment, rating } = req.body

        const destination =
            await prisma.touristDestination.findUnique({
                where: { 
                    slug, 
                }
            })

        if (!destination) {
            return res.status(404).json({
                message: "Destination tidak ditemukan"
            })
        }

        const review =
            await prisma.destinationReview.create({
                data: {
                    username,
                    comment,
                    rating: Number(rating),
                    destinationId: destination.id,
                }
            })

        const files = req.files as Express.Multer.File[]

        if (files?.length > 0) {

            await prisma.reviewImage.createMany({
                data: files.map((file) => ({
                    reviewId: review.id,
                    imageUrl:
                        `/images/reviews/${file.filename}`
                }))
            })
        }

        res.json({
            message: "Review berhasil ditambahkan"
        })
    }
)

export default router