import status from "http-status";
import z from "zod";
import { TErrorResponse, TErrorSource } from "../interfaces/error.interface";

export const handleZodError = (err: z.ZodError): TErrorResponse => {
  const statusCode = status.BAD_REQUEST;
  const message = "Zod validation error!";
  const errorSource: TErrorSource[] = [];
  err.issues.forEach((issue) => {
    errorSource.push({
      path: issue.path.join(" "),
      message: issue.message,
    });
  });

  return {
    success: false,
    message,
    errorSources: errorSource,
    statusCode,
  };
};
