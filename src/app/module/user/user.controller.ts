import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import status from "http-status";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdmin(req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Admin registered successfully",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await UserService.createDoctor(payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Doctor registered successfully",
    data: result,
  });
});

const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createSuperAdmin(req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Super admin registered successfully",
    data: result,
  });
});

export const UserController = {
  createAdmin,
  createDoctor,
  createSuperAdmin,
};
