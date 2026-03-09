import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import status from "http-status";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await SpecialtyService.createSpecialty(payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Specialty created successfully!",
    data: result,
  });
});

const getAllSpecialty = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtyService.getAllSpecialty();
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Specialties fetched successfully",
    data: result,
  });
});

const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialtyService.deleteSpecialty(id as string);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Specialties deleted successfully",
    data: result,
  });
});

export const SpecialtyController = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
};
