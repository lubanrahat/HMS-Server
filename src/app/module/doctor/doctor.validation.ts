import { z } from "zod";

export const updateDoctorSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  email: z.email("Invalid email address").max(50).optional(),
  profilePhoto: z.url("Invalid profile photo URL").optional(),
  contactNumber: z.string().min(10).max(15).optional(),
  address: z.string().max(100).optional(),
  registrationNumber: z.string().min(3).max(30).optional(),
  experience: z.int().min(0).max(50).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  appointmentFee: z.number().min(0).max(10000).optional(),
  qualification: z.string().min(3).max(50).optional(),
  currentWorkingPlace: z.string().min(3).max(50).optional(),
  designation: z.string().min(3).max(50).optional(),
  specialties: z.array(z.uuid("Invalid specialty ID")).min(1).optional(),
});
