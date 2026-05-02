import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import config from "../config/env";

const getAccessToken = (payload: JwtPayload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    config.jwt.accessTokenSecret,
    {
      expiresIn: parseInt(config.jwt.accessTokenExpiresIn),
    } as SignOptions,
  );
  return accessToken;
};

const getRefreshToken = (payload: JwtPayload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    config.jwt.refreshTokenSecret,
    {
      expiresIn: parseInt(config.jwt.refreshTokenExpiresIn),
    } as SignOptions,
  );
  return refreshToken;
};

export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
};
