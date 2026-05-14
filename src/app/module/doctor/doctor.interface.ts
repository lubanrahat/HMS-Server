export interface IUpdateDoctorPayload {
  name?: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  experience?: number;
}            
import { Gender, UserRole } from "../../../generated/prisma/enums";

export interface IRequestUser {
  userId: string;
  role: UserRole;
  email: string;
}

export interface IUpdateDoctorPayload {
  name?: string;
  email?: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  registrationNumber?: string;
  experience?: number;
  gender?: Gender;
  appointmentFee?: number;
  qualification?: string;
  currentWorkingPlace?: string;
  designation?: string;
  specialties?: string[];
}
