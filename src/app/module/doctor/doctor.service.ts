import { prisma } from "../../lib/prisma";

const getAllDoctors = async () => {
  const doctor = await prisma.doctor.findMany({
    where: {
      isDeleted: false
    },
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true
        }
      }
    }
  })

  return doctor
}

const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({ 
    where: {
      id,
      isDeleted: false
    },
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true
        }
      },
      appointments: {
        include: {
          patient: true,
          schedule: true,
          prescription: true
        }
      },
      doctorSchedules: {
        include: {
          schedule: true
        }
      },
      reviews: true
    }
  })

  return doctor
}

