"use strict";
// require("dotenv").config();
// import { Response } from "express";
// import { IUser } from "../models/user.model";
// // import jwt from "jsonwebtoken";
// import { redis } from "./redis";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.refreshTokenOptions = exports.accessTokenOptions = void 0;
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
// parse environmental variables to integrate with fallback values
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10);
exports.accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    // secure: true, // only works in https
};
exports.refreshTokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    // secure: true, // only works in https
};
const sendToken = (user, statusCode, res) => {
    const accessToken = user.signAccessToken();
    const refreshToken = user.signRefreshToken();
    //   only secure to true in production
    if (process.env.NODE_ENV === "production") {
        exports.accessTokenOptions.secure = true;
        // refreshTokenOptions.secure = true;
    }
    res.cookie("access_token", accessToken, exports.accessTokenOptions);
    res.cookie("refresh_token", refreshToken, exports.refreshTokenOptions);
    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
        // refreshToken,
    });
};
exports.sendToken = sendToken;
