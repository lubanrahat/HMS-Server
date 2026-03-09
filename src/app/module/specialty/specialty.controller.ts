import { NextFunction, Request, RequestHandler, Response } from "express";
import { SpecialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await SpecialtyService.createSpecialty(payload);

  return res.status(200).json({
    success: true,
    message: "Specialty created successfully",
    data: result,
  });
};

export const SpecialtyController = {
  createSpecialty,
};
