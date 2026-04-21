import { Specialty, UserRole } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateDoctorPayload } from "./user.interface";

const createDoctor = async (payload: ICreateDoctorPayload) => {
  const specialties: Specialty[] = [];
  for (const specialtyId of payload.specialties) {
    const specialty = await prisma.specialty.findUnique({
      where: {
        id: specialtyId,
      },
    });

    if (!specialty) {
      throw new Error(`Specialty whith id ${specialtyId} not found`);
    }

    specialties.push(specialty);
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: payload.doctor.email,
    },
  });

  if (!userExists) {
    throw Error(`User with this email already exists`);
  }

  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.doctor.email,
      password: payload.password,
      role: UserRole.DOCTOR,
      name: payload.doctor.name,
      needPasswordChange: true,
    },
  });

  try {
    const result = await prisma.$transaction(async (tx) => {
      const doctorData = await tx.doctor.create({
        data: {
          userId: userData.user.id,
          ...payload.doctor,
        },
      });

      const doctorSpecialtyData = specialties.map((specialtie) => {
        return {
          doctorId: doctorData.id,
          specialtyId: specialtie.id,
        };
      });

      await tx.doctorSpecialty.createMany({
        data: doctorSpecialtyData,
      });
    });

    return result;
  } catch (error) {
    console.log("Transaction error : ", error);
    await prisma.user.delete({
      where: {
        id: userData.user.id,
      },
    });
    throw error;
  }
};
