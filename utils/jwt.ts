require("dotenv").config();
import { Response } from "express";
import { IUser } from "../models/user.model";
// import jwt from "jsonwebtoken";
import { redis } from "./redis";

interface ITokensOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  //   upload session to redis
  redis.set(user._id as string, JSON.stringify(user));

  // parse environmental variables to integrate with fallback values
  const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || "300",
    10
  );
  const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "10200",
    10
  );

  const accessTokenOptions: ITokensOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 1000),
    maxAge: accessTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
    // secure: true, // only works in https
  };

  const refreshTokenOptions: ITokensOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 1000),
    maxAge: refreshTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
    // secure: true, // only works in https
  };

  //   only secure to true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
    // refreshTokenOptions.secure = true;
  }

  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
    // refreshToken,
  });
};
