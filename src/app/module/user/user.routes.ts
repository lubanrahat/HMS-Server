import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import {
  adminCreateSchema,
  doctorCreateSchema,
  superAdminCreateSchema,
} from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-admin",
  checkAuth(UserRole.SUPER_ADMIN),
  validateRequest(adminCreateSchema),
  UserController.createAdmin,
);

router.post(
  "/create-doctor",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(doctorCreateSchema),
  UserController.createDoctor,
);

router.post(
  "/create-super-admin",
  checkAuth(UserRole.SUPER_ADMIN),
  validateRequest(superAdminCreateSchema),
  UserController.createSuperAdmin,
);

export const UserRoutes = router;
