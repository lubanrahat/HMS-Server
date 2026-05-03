import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import config from "./app/config/env";
import { notFound } from "./app/middleware/notFound";
import cookieParser from "cookie-parser";

function createApp(): Application {
  const app: Application = express();

  app.use(
    cors({
      origin: config.frontend.url,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({ status: "OK" });
  });

  app.use("/api/v1", IndexRoutes);

  //Global Error Handler
  app.use(globalErrorHandler);
  //Not found route
  app.use(notFound);

  return app;
}

export default createApp;
