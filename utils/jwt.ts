// require("dotenv").config();
// import { Response } from "express";
// import { IUser } from "../models/user.model";
// // import jwt from "jsonwebtoken";
// import { redis } from "./redis";

// interface ITokensOptions {
//   expires: Date;
//   maxAge: number;
//   httpOnly: boolean;
//   sameSite: "lax" | "strict" | "none" | undefined;
//   secure?: boolean;
// }

// // parse environmental variables to integrate with fallback values
// const accessTokenExpire = parseInt(
//   process.env.ACCESS_TOKEN_EXPIRE || "300",
//   10
// );
// const refreshTokenExpire = parseInt(
//   process.env.REFRESH_TOKEN_EXPIRE || "1200",
//   10
// );

// export const accessTokenOptions: ITokensOptions = {
//   expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
//   maxAge: accessTokenExpire * 60 * 60 * 1000,
//   httpOnly: true,
//   sameSite: "lax",
//   // secure: true, // only works in https
// };

// export const refreshTokenOptions: ITokensOptions = {
//   expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
//   maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
//   httpOnly: true,
//   sameSite: "lax",
//   // secure: true, // only works in https
// };

// export const sendToken = (user: IUser, statusCode: number, res: Response) => {
//   const accessToken = user.signAccessToken();
//   const refreshToken = user.signRefreshToken();

//   //   upload session to redis
//   redis.set(user._id as string, JSON.stringify(user));

//   //   only secure to true in production
//   if (process.env.NODE_ENV === "production") {
//     accessTokenOptions.secure = true;
//     // refreshTokenOptions.secure = true;
//   }

//   res.cookie("access_token", accessToken, accessTokenOptions);
//   res.cookie("refresh_token", refreshToken, refreshTokenOptions);

//   res.status(statusCode).json({
//     success: true,
//     user,
//     accessToken,
//     // refreshToken,
//   });
// };

require("dotenv").config();
import { Response } from "express";
import { IUser } from "../models/user.model";

interface ITokensOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

// parse environmental variables to integrate with fallback values
const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);
const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);

// export const accessTokenOptions: ITokensOptions = {
//   expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
//   maxAge: accessTokenExpire * 60 * 60 * 1000,
//   httpOnly: true,
//   // sameSite: "lax",
//   // // secure: true, // only works in https
//   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cross-site in production
//   secure: process.env.NODE_ENV === "production", // HTTPS only in production
// };

// export const refreshTokenOptions: ITokensOptions = {
//   expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
//   maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
//   httpOnly: true,
//   // sameSite: "lax",
//   // secure: true, // only works in https
//   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cross-site in production
//   secure: process.env.NODE_ENV === "production", // HTTPS only in production
// };

export const accessTokenOptions: ITokensOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 1000), // Seconds to milliseconds
  maxAge: accessTokenExpire * 1000, // Seconds to milliseconds
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
};

export const refreshTokenOptions: ITokensOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 1000), // Seconds to milliseconds
  maxAge: refreshTokenExpire * 1000, // Seconds to milliseconds
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
};

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  // //   only secure to true in production
  // if (process.env.NODE_ENV === "production") {
  //   accessTokenOptions.secure = true;
  //   refreshTokenOptions.secure = true;
  // }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
    // refreshToken,
  });
};
