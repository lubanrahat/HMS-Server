import { NextFunction, Request, Response } from "express";
import config from "../config/env";
import status from "http-status";
import z from "zod";
import { TErrorResponse, TErrorSource } from "../interfaces/error.interface";
import { handleZodError } from "../errorHelpers/handleZodError";


export const globalErrorHandler = async (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (config.app.nodeEnv === "development") {
    console.log("Error from Global Error Handler", err);
  }

  let errorSource: TErrorSource[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message = "Internal server error!";

  if (err instanceof z.ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    
    errorSource = [...simplifiedError.errorSources]
  }

  const errorResponse: TErrorResponse = {
    success: false,
    message: message,
    errorSources: errorSource,
    statusCode,
    error:
      config.app.nodeEnv === "development" &&
      (err instanceof Error ? err.message : message),
  }

  res.status(statusCode).json(errorResponse);
};
