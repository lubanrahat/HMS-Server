import express from "express";
import { SpecialtyRoutes } from "../module/specialty/specialty.routes";
import { authRoutes } from "../module/auth/auth.routes";

const router = express.Router();

router.use("/auth",authRoutes)
router.use("/specialties",SpecialtyRoutes)

export const IndexRoutes = router;