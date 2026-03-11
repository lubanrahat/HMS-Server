import { NextFunction, Request, Response } from "express";
import config from "../config/env";

export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    if(config.app.nodeEnv === "development") {
        console.log("Error from Global Error Handler", err);
    }
}