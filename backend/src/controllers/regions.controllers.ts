import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()


export const getRegions = async (req: Request, res: Response) => {
  const regions = await prisma.region.findMany({
    orderBy: { regionName: "asc" }
  });
  res.json(regions);
};