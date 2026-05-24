import status from "http-status";
import { Specialty, UserRole } from "../../../generated/prisma/client";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import {
  ICreateAdminPayload,
  ICreateDoctorPayload,
  ICreateSuperAdminPayload,
} from "./user.interface";

const userSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  status: true,
  emailVerified: true,
  image: true,
  isDeleted: true,
  createdAt: true,
  updatedAt: true,
};

const assertUserDoesNotExist = async (email: string) => {
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new AppError(status.CONFLICT, "User with this email already exists");
  }
};

const cleanupUser = async (userId: string) => {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

const createAdmin = async (payload: ICreateAdminPayload) => {
  await assertUserDoesNotExist(payload.admin.email);

  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.admin.email,
      password: payload.password,
      role: UserRole.ADMIN,
      name: payload.admin.name,
      needPasswordChange: true,
    },
  });

  try {
    return await prisma.$transaction(async (tx) => {
      const admin = await tx.admin.create({
        data: {
          userId: userData.user.id,
          ...payload.admin,
        },
        include: {
          user: {
            select: userSelect,
          },
        },
      });

      return admin;
    });
  } catch (error) {
    await cleanupUser(userData.user.id);
    throw error;
  }
};

const createSuperAdmin = async (payload: ICreateSuperAdminPayload) => {
  await assertUserDoesNotExist(payload.superAdmin.email);

  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.superAdmin.email,
      password: payload.password,
      role: UserRole.SUPER_ADMIN,
      name: payload.superAdmin.name,
      needPasswordChange: true,
    },
  });

  try {
    return await prisma.$transaction(async (tx) => {
      const superAdmin = await tx.admin.create({
        data: {
          userId: userData.user.id,
          ...payload.superAdmin,
        },
        include: {
          user: {
            select: userSelect,
          },
        },
      });

      return superAdmin;
    });
  } catch (error) {
    await cleanupUser(userData.user.id);
    throw error;
  }
};

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

  await assertUserDoesNotExist(payload.doctor.email);

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

      const doctor = await tx.doctor.findUnique({
        where: {
          id: doctorData.id,
        },
        select: {
          id: true,
          userId: true,
          name: true,
          email: true,
          profilePhoto: true,
          contactNumber: true,
          address: true,
          registrationNumber: true,
          experience: true,
          gender: true,
          appointmentFee: true,
          qualification: true,
          currentWorkingPlace: true,
          designation: true,
          user: {
            select: userSelect,
          },
          specialties: {
            select: {
              specialty: {
                select: {
                  title: true,
                  id: true,
                },
              },
            },
          },
        },
      });

      return doctor;

    });

    return result;
  } catch (error) {
    await cleanupUser(userData.user.id);
    throw error;
  }
};

export const UserService = {
  createAdmin,
  createDoctor,
  createSuperAdmin,
}
