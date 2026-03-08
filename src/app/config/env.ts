import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  //App
  PORT: z.string().min(1, "PORT is required"),
  //Database
  DATABASE_URL: z.string().url().min(1, "DATABASE_URL is required"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Environment variable validation failed:",
    parsedEnv.error.format(),
  );
  process.exit(1);
}

const env = parsedEnv.data;

const config = {
  app: {
    port: env.PORT,
  },
  database: {
    url: env.DATABASE_URL,
  },
};

export default config;
