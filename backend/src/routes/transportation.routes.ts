import { Router } from "express";
import { prisma } from "../config/db";
import { Request, Response } from "express";

const router = Router()

// ROUTE ALL TRANSPORTATIONS
router.get("/", async (req, res) => {

    const transport = 
        await prisma.transportation.findMany({
            include: {
                category: true,
            },
        })
    
    res.json(transport)
})

export default router