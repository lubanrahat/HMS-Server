import { email, z } from "zod";

export const doctorCreateSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),

  doctor: z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(30, "Name must be at most 50 characters long"),
    email: email("Invalid email address").max(
      50,
      "Email must be at most 50 characters long",
    ),
    profilePhoto: z.string().optional(),
    contactNumber: z
      .string()
      .min(10, "Contact number must be at least 10 digits long")
      .max(15, "Contact number must be at most 15 digits long")
      .optional(),
    address: z
      .string()
      .max(100, "Address must be at most 100 characters long")
      .optional(),
    registrationNumber: z
      .string()
      .min(1, "Registration number is required")
      .min(3, "Registration number must be at least 3 characters long")
      .max(30, "Registration number must be at most 30 characters long"),
    experience: z
      .number()
      .min(0, "Experience must be a positive number")
      .max(50, "Experience must be at most 50 years"),
    gender: z.enum(["MALE", "FEMALE"]),
    appointmentFee: z
      .number()
      .min(0, "Appointment fee must be a positive number")
      .max(10000, "Appointment fee must be at most 10000"),
    qualification: z
      .string()
      .min(1, "Qualification is required")
      .min(3, "Qualification must be at least 3 characters long")
      .max(50, "Qualification must be at most 50 characters long"),
    currentWorkingPlace: z
      .string()
      .min(1, "Current working place is required")
      .min(3, "Current working place must be at least 3 characters long")
      .max(50, "Current working place must be at most 50 characters long"),
    designation: z
      .string()
      .min(1, "Designation is required")
      .min(3, "Designation must be at least 3 characters long")
      .max(50, "Designation must be at most 50 characters long"),
  }),
  specialties: z
    .array(
      z
        .uuid("Invalid specialty ID")
        .min(1, "Specialty must be at least 1 character long")
        .max(50, "Specialty must be at most 50 characters long"),
    )
    .min(1, "At least one specialty is required"),
});
