import { Router } from "express";
import { UserRole } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { DoctorController } from "./doctor.controller";
import { updateDoctorSchema } from "./doctor.validation";

const router = Router();

router.get(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DoctorController.getAllDoctors,
);

router.get(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR),
  DoctorController.getDoctorById,
);

router.patch(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR),
  validateRequest(updateDoctorSchema),
  DoctorController.updateDoctor,
);

router.delete(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DoctorController.deleteDoctor,
);

export const DoctorRoutes = router;
