import express, { Router } from "express";
import { SpecialtyController } from "./specialty.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router: Router = express.Router();

router.post("/",checkAuth(UserRole.ADMIN,UserRole.SUPER_ADMIN), SpecialtyController.createSpecialty);
router.get("/", SpecialtyController.getAllSpecialty);
router.delete("/:id", SpecialtyController.deleteSpecialty);

export const SpecialtyRoutes = router;
