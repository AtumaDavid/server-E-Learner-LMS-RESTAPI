// import { NextFunction, Request, Response } from "express";
// import { CatchAsyncError } from "./catchAsyncError";
// import ErrorHandler from "../utils/ErrorHandler";
// import jwt from "jsonwebtoken";
// import { redis } from "../utils/redis";

// // AUTHENTICATED USER
// export const isAuthenticated = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const access_token = req.cookies.access_token;

//     if (!access_token) {
//       return next(
//         new ErrorHandler("Please login to access this resource", 400)
//       );
//     }

//     const decoded = jwt.verify(
//       access_token,
//       process.env.ACCESS_TOKEN as string
//     ) as jwt.JwtPayload & { id: string };

//     if (!decoded) {
//       return next(new ErrorHandler("Access token not valid", 400));
//     }

//     const user = await redis.get(decoded.id);

//     if (!user) {
//       return next(new ErrorHandler("User not found", 404));
//     }

//     req.user = JSON.parse(user);

//     next();
//   }
// );

// // VALIDATE USER ROLE
// export const authorizeRoles = (...roles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user?.role || "")) {
//       return next(
//         new ErrorHandler(
//           `Role (${req.user?.role}) is not allowed to access this resource`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };

import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt from "jsonwebtoken";
import User from "../models/user.model"; // Import User model instead of using Redis

// AUTHENTICATED USER
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as jwt.JwtPayload & { id: string };

    if (!decoded) {
      return next(new ErrorHandler("Access token not valid", 400));
    }

    // Get user from database instead of Redis
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = user;

    next();
  }
);

// VALIDATE USER ROLEE
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role (${req.user?.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
