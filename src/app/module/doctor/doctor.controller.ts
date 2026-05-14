import type { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { DoctorService } from "./doctor.service";
import sendResponse from "../../shared/sendResponse";
import status from "http-status";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorService.getAllDoctors();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor fetched successfully",
    data: result,
  });
});

const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorService.getDoctorById(String(req.params.id), req.user);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor fetched successfully",
    data: result,
  });
});

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorService.updateDoctor(
    String(req.params.id),
    req.body,
    req.user,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor updated successfully",
    data: result,
  });
});

const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorService.deleteDoctor(String(req.params.id));

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
});

export const DoctorController = {
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
};
