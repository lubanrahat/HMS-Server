import express, { Application, Request, Response } from "express";
import cors from "cors";

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

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "Hello worlds!" });
  });
  
  return app;
}

export default createApp;
