import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { doctorCreateSchema } from "./user.validation";

const router = Router();

router.post(
  "/create-doctor",
  validateRequest(doctorCreateSchema),
  UserController.createDoctor,
);

export const UserRoutes = router;
