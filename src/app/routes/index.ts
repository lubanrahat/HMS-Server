import express from "express";
import { SpecialtyRoutes } from "../module/specialty/specialty.route";
import { authRoutes } from "../module/auth/auth.route";

const router = express.Router();

router.use("/auth",authRoutes)
router.use("/specialties",SpecialtyRoutes)

export const IndexRoutes = router;