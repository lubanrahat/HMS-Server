import { NextFunction, Request, Response } from "express";
import config from "../config/env";
import status from "http-status";

export const globalErrorHandler = async (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (config.app.nodeEnv === "development") {
    console.log("Error from Global Error Handler", err);
  }

  res.status(status.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal server error!",
    error: err instanceof Error ? err.message : "Internal server error!",
  });
};
