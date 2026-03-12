import express, { Router } from "express";
import { SpecialtyController } from "./specialty.controller";

const router: Router = express.Router();

router.post("/",SpecialtyController.createSpecialty);
router.get("/",SpecialtyController.getAllSpecialty);
router.delete("/:id",SpecialtyController.deleteSpecialty)

export const SpecialtyRoutes = router;