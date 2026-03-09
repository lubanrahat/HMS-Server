import express, { Application, Request, Response } from "express";
import cors from "cors";
import { IndexRoutes } from "./app/routes";

function createApp(): Application {
  const app: Application = express();

  app.use(
    cors({
      origin: "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({ status: "OK" });
  });

  app.use("/api/v1", IndexRoutes);

  return app;
}

export default createApp;
