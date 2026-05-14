import status from "http-status";
import { UserRole } from "../../../generated/prisma/enums";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { IRequestUser, IUpdateDoctorPayload } from "./doctor.interface";

const doctorInclude = {
  user: true,
  specialties: {
    include: {
      specialty: true,
    },
  },
};

const assertDoctorAccess = (doctorUserId: string, user?: IRequestUser) => {
  // DOCTOR role is allowed to access only its own profile data.
  if (user?.role === UserRole.DOCTOR && user.userId !== doctorUserId) {
    throw new AppError(status.FORBIDDEN, "Forbidden access");
  }
};

const getAllDoctors = async () => {
  const doctors = await prisma.doctor.findMany({
    where: {
      isDeleted: false,
    },
    include: doctorInclude,
    orderBy: {
      createdAt: "desc",
    },
  });

  return doctors;
};

const getDoctorById = async (id: string, user?: IRequestUser) => {
  const doctor = await prisma.doctor.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: doctorInclude,
  });

  if (!doctor) {
    throw new AppError(status.NOT_FOUND, "Doctor not found");
  }

  assertDoctorAccess(doctor.userId, user);

  return doctor;
};

const updateDoctor = async (
  id: string,
  payload: IUpdateDoctorPayload,
  user?: IRequestUser,
) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
  });

  if (!doctor) {
    throw new AppError(status.NOT_FOUND, "Doctor not found");
  }

  if (doctor.isDeleted) {
    throw new AppError(status.BAD_REQUEST, "Doctor is already deleted");
  }

  assertDoctorAccess(doctor.userId, user);

  const { specialties, ...doctorData } = payload;

  if (doctorData.email && doctorData.email !== doctor.email) {
    const emailExists = await prisma.doctor.findFirst({
      where: {
        email: doctorData.email,
        id: {
          not: id,
        },
      },
    });

    if (emailExists) {
      throw new AppError(status.CONFLICT, "Doctor with this email already exists");
    }
  }

  if (specialties?.length) {
    const specialtyCount = await prisma.specialty.count({
      where: {
        id: {
          in: specialties,
        },
        isDeleted: false,
      },
    });

    if (specialtyCount !== new Set(specialties).size) {
      throw new AppError(status.NOT_FOUND, "One or more specialties not found");
    }
  }

  return await prisma.$transaction(async (tx) => {
    if (Object.keys(doctorData).length) {
      await tx.doctor.update({
        where: {
          id,
        },
        data: doctorData,
      });

      if (doctorData.name || doctorData.email || doctorData.profilePhoto) {
        await tx.user.update({
          where: {
            id: doctor.userId,
          },
          data: {
            name: doctorData.name,
            email: doctorData.email,
            image: doctorData.profilePhoto,
          },
        });
      }
    }

    if (specialties) {
      await tx.doctorSpecialty.deleteMany({
        where: {
          doctorId: id,
        },
      });

      await tx.doctorSpecialty.createMany({
        data: [...new Set(specialties)].map((specialtyId) => ({
          doctorId: id,
          specialtyId,
        })),
      });
    }

    return await tx.doctor.findUnique({
      where: {
        id,
      },
      include: doctorInclude,
    });
  });
};

const deleteDoctor = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
  });

  if (!doctor) {
    throw new AppError(status.NOT_FOUND, "Doctor not found");
  }

  if (doctor.isDeleted) {
    throw new AppError(status.BAD_REQUEST, "Doctor is already deleted");
  }

  return await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: {
        id: doctor.userId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return await tx.doctor.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  });
};

export const DoctorService = {
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
};
