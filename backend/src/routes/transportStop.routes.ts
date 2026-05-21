import { Router } from "express";
import { prisma } from "../config/db";
import { Request, Response } from "express";

const router = Router()

// ROUTE ALL TRANSPORT STOP
router.get("/", async (req, res) => {

    const transportStop = 
        await prisma.transportStop.findMany({
            include: {
                region: true,
                category: true,
            },
        })
    
    res.json(transportStop)
})

export default router