import express from "express";
import { SpecialtyRoutes } from "../module/specialty/specialty.routes";
import { authRoutes } from "../module/auth/auth.routes";
import { UserRoutes } from "../module/user/user.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/specialties", SpecialtyRoutes);
router.use("/doctors", UserRoutes);

export const IndexRoutes = router;
