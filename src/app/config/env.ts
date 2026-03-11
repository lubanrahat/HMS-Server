import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  //App
  PORT: z.string().min(1, "PORT is required"),
  NODE_ENV: z.string().min(1, "NODE_ENV is required"),
  //Database
  DATABASE_URL: z.string().url().min(1, "DATABASE_URL is required"),
  //Better auth
  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
  BETTER_AUTH_URL: z.string().min(1, "BETTER_AUTH_URL is required"),
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
    nodeEnv: env.NODE_ENV,
  },
  database: {
    url: env.DATABASE_URL,
  },
  betterAuth: {
    secret: env.BETTER_AUTH_SECRET,
    url: env.BETTER_AUTH_URL,
  },
};

export default config;
