import { jwt, z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  //App
  PORT: z.string().min(1, "PORT is required"),
  NODE_ENV: z.string().min(1, "NODE_ENV is required"),
  //frontend
  FRONTEND_URL: z.string().url().min(1, "FRONTEND_URL is required"),
  //Database
  DATABASE_URL: z.string().url().min(1, "DATABASE_URL is required"),
  //Better auth
  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
  BETTER_AUTH_URL: z.string().min(1, "BETTER_AUTH_URL is required"),
  BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN: z
    .string()
    .min(1, "BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN is required"),
  BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE: z
    .string()
    .min(1, "BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE is required"),
  //JWT
  ACCESS_TOKEN_SECRET: z.string().min(1, "ACCESS_TOKEN_SECRET is required"),
  REFRESH_TOKEN_SECRET: z.string().min(1, "REFRESH_TOKEN_SECRET is required"),
  ACCESS_TOKEN_EXPIRES_IN: z
    .string()
    .min(1, "ACCESS_TOKEN_EXPIRES_IN is required"),
  REFRESH_TOKEN_EXPIRES_IN: z
    .string()
    .min(1, "REFRESH_TOKEN_EXPIRES_IN is required"),
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
    sessionTokenExpiresIn: env.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN,
    sessionTokenUpdateAge: env.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE,
  },
  frontend: {
    url: env.FRONTEND_URL,
  },
  jwt: {
    accessTokenSecret: env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  },
};

export default config;
