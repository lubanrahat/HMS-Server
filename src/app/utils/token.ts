import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import config from "../config/env";
import { Response } from "express";
import { cookieUtils } from "./cookie";

const getAccessToken = (payload: JwtPayload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    config.jwt.accessTokenSecret,
    {
      expiresIn: config.jwt.accessTokenExpiresIn,
    } as SignOptions,
  );
  return accessToken;
};

const getRefreshToken = (payload: JwtPayload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    config.jwt.refreshTokenSecret,
    {
      expiresIn: config.jwt.refreshTokenExpiresIn,
    } as SignOptions,
  );
  return refreshToken;
};

const setAccessTokenCookie = (res: Response, token: string) => {
  cookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: config.app.nodeEnv === "production",
    sameSite: config.app.nodeEnv === "production" ? "none" : "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
  });
};

const setRefreshTokenCookie = (res: Response, token: string) => {
  cookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: config.app.nodeEnv === "production",
    sameSite: config.app.nodeEnv === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
  });
};

const setBetterAuthTokenSessionCookie = (res: Response, token: string) => {
  cookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: config.app.nodeEnv === "production",
    sameSite: config.app.nodeEnv === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
  });
};

export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthTokenSessionCookie,
};
