import { Router } from "express";
import { getRegions } from "../controllers/regions.controllers";

const router = Router();

router.get("/regions", getRegions);

export default router;