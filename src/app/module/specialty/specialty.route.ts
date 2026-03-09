import express, { Router } from "express";
import { SpecialtyController } from "./specialty.controller";

const router: Router = express.Router();

router.post("/",SpecialtyController.createSpecialty);

export const SpecialtyRoutes = router;