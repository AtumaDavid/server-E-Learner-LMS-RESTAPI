"use strict";
// import { CatchAsyncError } from "../middleware/catchAsyncError";
// import ErrorHandler from "../utils/ErrorHandler";
// import userModel, { IUser } from "./../models/user.model";
// import { NextFunction, Request, Response } from "express";
// import cloudinary from "cloudinary";
// import jwt, { Secret } from "jsonwebtoken";
// // import ejs from "ejs";
// // import path from "path";
// import sendMail from "../utils/sendMail";
// import {
//   accessTokenOptions,
//   refreshTokenOptions,
//   sendToken,
// } from "../utils/jwt";
// import { redis } from "../utils/redis";
// import {
//   getAllUsersService,
//   getUserById,
//   updateUserRoleService,
// } from "../services/user.service";
// require("dotenv").config();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateRole = exports.getAllUsers = exports.updateProfilePicture = exports.updatePassword = exports.UpdateUserInfo = exports.socialAuth = exports.getUserInfo = exports.updateAccessToken = exports.logoutUser = exports.loginUser = exports.activateUser = exports.createActivationToken = exports.registerUser = void 0;
// // REGISTER USER
// interface IRegistration {
//   name: string;
//   email: string;
//   password: string;
//   avatar?: string;
// }
// // REGISTER USER
// export const registerUser = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { name, email, password }: IRegistration = req.body;
//       const isEmailExist = await userModel.findOne({ email });
//       if (isEmailExist) {
//         return next(new ErrorHandler("Email already exists", 400));
//       }
//       const user: IRegistration = {
//         name,
//         email,
//         password,
//       };
//       const activationToken = createActivationToken(user);
//       const activationCode = activationToken.activationCode;
//       const data = { user: { name: user.name }, activationCode };
//       // const html = await ejs.renderFile(
//       //   path.join(__dirname, "../mails/activation-mail.ejs"),
//       //   data
//       // );
//       try {
//         await sendMail({
//           email: user.email,
//           subject: "Account Activation",
//           template: "activation-mail.ejs",
//           data,
//         });
//         res.status(201).json({
//           success: true,
//           message: `Please check your email: ${user.email} to activate your account`,
//           activationToken: activationToken.token,
//         });
//       } catch (error: any) {
//         return next(new ErrorHandler(error.message, 400));
//       }
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
// // CREATE ACTIVATION TOKEN
// interface IActivationToken {
//   token: string;
//   activationCode: string;
//   // user: IRegistration;
// }
// // CREATE ACTIVATION TOKEN
// export const createActivationToken = (
//   user: IRegistration
// ): IActivationToken => {
//   const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
//   const token = jwt.sign(
//     {
//       user,
//       activationCode,
//     },
//     process.env.ACTIVATION_SECRET as Secret,
//     {
//       expiresIn: "5m",
//     }
//   );
//   return { token, activationCode };
// };
// // ACTIVATE USERS
// interface IActivationRequest {
//   activation_code: string;
//   activation_token: string;
// }
// // ACTIVATE USERS
// export const activateUser = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { activation_code, activation_token }: IActivationRequest =
//         req.body;
//       const newUser: { user: IUser; activationCode: string } = jwt.verify(
//         activation_token,
//         process.env.ACTIVATION_SECRET as string
//       ) as { user: IUser; activationCode: string };
//       if (newUser.activationCode !== activation_code) {
//         return next(new ErrorHandler("Invalid activation code", 400));
//       }
//       const { name, email, password } = newUser.user;
//       const existUser = await userModel.findOne({ email });
//       if (existUser) {
//         return next(new ErrorHandler("User already exists", 400));
//       }
//       const user = await userModel.create({
//         name,
//         email,
//         password,
//       });
//       res.status(201).json({
//         success: true,
//         message: "Account activated successfully",
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
// // LOGIN USER
// interface ILogin {
//   email: string;
//   password: string;
// }
// // LOGIN USER
// export const loginUser = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { email, password }: ILogin = req.body;
//       if (!email || !password) {
//         return next(new ErrorHandler("Please enter email & password", 400));
//       }
//       const user = await userModel.findOne({ email }).select("+password");
//       if (!user) {
//         return next(new ErrorHandler("Invalid email or password", 401));
//       }
//       const isPasswordMatched = await user.comparePassword(password);
//       if (!isPasswordMatched) {
//         return next(new ErrorHandler("Invalid email or password", 401));
//       }
//       sendToken(user, 200, res);
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
// // LOGOUT USER
// export const logoutUser = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       res.cookie("access_token", "", { maxAge: 1 });
//       res.cookie("refresh_token", "", { maxAge: 1 });
//       const userId = req.user?._id?.toString() || "";
//       redis.del(userId);
//       res.status(200).json({
//         success: true,
//         message: "Logged out successfully",
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
// // UPDATE ACCESS TOKEN
// export const updateAccessToken = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const refresh_token = req.cookies.refresh_token as string;
//       if (!refresh_token) {
//         return next(
//           new ErrorHandler("Please login to access this resource", 400)
//         );
//       }
//       const decoded = jwt.verify(
//         refresh_token,
//         process.env.REFRESH_TOKEN as string
//       ) as jwt.JwtPayload & { id: string };
//       if (!decoded) {
//         return next(new ErrorHandler("Refresh token not valid", 400));
//       }
//       const session = (await redis.get(decoded.id)) as string;
//       if (!session) {
//         return next(
//           new ErrorHandler("Please login to access this resource", 400)
//         );
//       }
//       // sendToken(JSON.parse(session), 200, res);
//       const user = JSON.parse(session);
//       const accessToken = jwt.sign(
//         { id: user._id },
//         process.env.ACCESS_TOKEN as string,
//         {
//           expiresIn: "5m",
//         }
//       );
//       const refreshToken = jwt.sign(
//         { id: user._id },
//         process.env.REFRESH_TOKEN as string,
//         {
//           expiresIn: "7d",
//         }
//       );
//       req.user = user;
//       res.cookie("access_token", accessToken, accessTokenOptions);
//       res.cookie("refresh_token", refreshToken, refreshTokenOptions);
//       await redis.set(user._id, JSON.stringify(user), "EX", 604800); //ex- 7days in secs
//       res.status(200).json({
//         success: "success",
//         accessToken,
//         // refreshToken,
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
// // GET USER INFO
// export const getUserInfo = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // const userId = req.user?._id;
//       const userId = req.user?._id ? req.user._id.toString() : "";
//       getUserById(userId, res);
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
// interface ISocialAuthBody {
//   name: string;
//   email: string;
//   avatar: string;
// }
// // SOCIAL AUTH
// export const socialAuth = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { name, email, avatar }: ISocialAuthBody = req.body;
//       const user = await userModel.findOne({ email });
//       if (!user) {
//         // sendToken(user, 200, res);
//         const newUser = await userModel.create({
//           name,
//           email,
//           avatar,
//         });
//         sendToken(newUser, 200, res);
//       } else {
//         sendToken(user, 200, res);
//       }
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
// // UPDATE USER INFO
// interface IUpdateUserInfo {
//   name: string;
//   email: string;
//   // avatar: string;
// }
// // UPDATE USER INFO
// export const UpdateUserInfo = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // console.log("User ID:", req.user?._id);
//       // console.log("Request Body:", req.body);
//       const { name, email } = req.body as IUpdateUserInfo;
//       const userId = req.user?._id;
//       const user = await userModel.findById(userId);
//       if (email && user) {
//         const isEmailExist = await userModel.findOne({ email });
//         if (isEmailExist) {
//           return next(new ErrorHandler("Email already exists", 400));
//         }
//       }
//       if (name && user) {
//         user.name = name;
//       }
//       await user?.save();
//       await redis.set(userId as string, JSON.stringify(user));
//       res.status(201).json({
//         success: true,
//         user,
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
// // UPDATE USER PASSWORD
// interface IUpdateUserPassword {
//   oldPassword: string;
//   newPassword: string;
// }
// export const updatePassword = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { oldPassword, newPassword }: IUpdateUserPassword = req.body;
//       if (!oldPassword || !newPassword) {
//         return next(new ErrorHandler("please enter old and new password", 400));
//       }
//       // const user = req.user;
//       const user = await userModel.findById(req.user?._id).select("+password");
//       // social auth users have no password
//       if (user?.password === undefined) {
//         return next(new ErrorHandler("Invalid User", 404));
//       }
//       const isPasswordMatched = await user?.comparePassword(oldPassword);
//       if (!isPasswordMatched) {
//         return next(new ErrorHandler("Old password is incorrect", 400));
//       }
//       user.password = newPassword;
//       await user.save();
//       await redis.set(req.user?._id as string, JSON.stringify(user));
//       res.status(201).json({
//         success: true,
//         message: "Password updated successfully",
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
// interface IUpdateProfilePicture {
//   avatar: string;
// }
// // UPDATE USER AVATAR / PROFILE PICTURE
// export const updateProfilePicture = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { avatar } = req.body;
//       const userId = req.user._id;
//       const user = await userModel.findById(userId);
//       if (avatar && user) {
//         // if avatar exists
//         if (user?.avatar?.public_id) {
//           // first delete old image
//           await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
//           const myCloud = await cloudinary.v2.uploader.upload(avatar, {
//             folder: "avatars",
//             width: 150,
//             // crop: "scale",
//           });
//           user.avatar = {
//             public_id: myCloud.public_id,
//             url: myCloud.secure_url,
//           };
//         } else {
//           const myCloud = await cloudinary.v2.uploader.upload(avatar, {
//             folder: "avatars",
//             width: 150,
//             // crop: "scale",
//           });
//           user.avatar = {
//             public_id: myCloud.public_id,
//             url: myCloud.secure_url,
//           };
//         }
//       }
//       await user?.save();
//       await redis.set(userId as string, JSON.stringify(user));
//       res.status(201).json({
//         success: true,
//         user,
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
// // GET ALL USERS -- ONLY ADMIN
// export const getAllUsers = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       getAllUsersService(res);
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
// // UPDATE USER ROLE --ONLY ADMIN
// export const updateRole = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { id, role } = req.body;
//       updateUserRoleService(res, id, role);
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
// // DELETE USER --ADMIN
// export const deleteUser = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { id } = req.params;
//       const user = await userModel.findById(id);
//       if (!user) {
//         return next(new ErrorHandler("User not found", 404));
//       }
//       await user?.deleteOne({ id });
//       await redis.del(id);
//       res.status(200).json({
//         success: true,
//         message: "User deleted successfully",
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const user_model_1 = __importDefault(require("./../models/user.model"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import ejs from "ejs";
// import path from "path";
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const jwt_1 = require("../utils/jwt");
const user_service_1 = require("../services/user.service");
require("dotenv").config();
// REGISTER USER
exports.registerUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const isEmailExist = yield user_model_1.default.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler_1.default("Email already exists", 400));
        }
        const user = {
            name,
            email,
            password,
        };
        const activationToken = (0, exports.createActivationToken)(user);
        const activationCode = activationToken.activationCode;
        const data = { user: { name: user.name }, activationCode };
        // const html = await ejs.renderFile(
        //   path.join(__dirname, "../mails/activation-mail.ejs"),
        //   data
        // );
        try {
            yield (0, sendMail_1.default)({
                email: user.email,
                subject: "Account Activation",
                template: "activation-mail.ejs",
                data,
            });
            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your account`,
                activationToken: activationToken.token,
            });
        }
        catch (error) {
            return next(new ErrorHandler_1.default(error.message, 400));
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// CREATE ACTIVATION TOKEN
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({
        user,
        activationCode,
    }, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
    return { token, activationCode };
};
exports.createActivationToken = createActivationToken;
// ACTIVATE USERS
exports.activateUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activation_code, activation_token } = req.body;
        const newUser = jsonwebtoken_1.default.verify(activation_token, process.env.ACTIVATION_SECRET);
        if (newUser.activationCode !== activation_code) {
            return next(new ErrorHandler_1.default("Invalid activation code", 400));
        }
        const { name, email, password } = newUser.user;
        const existUser = yield user_model_1.default.findOne({ email });
        if (existUser) {
            return next(new ErrorHandler_1.default("User already exists", 400));
        }
        const user = yield user_model_1.default.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            success: true,
            message: "Account activated successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// LOGIN USER
exports.loginUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler_1.default("Please enter email & password", 400));
        }
        const user = yield user_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler_1.default("Invalid email or password", 401));
        }
        const isPasswordMatched = yield user.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler_1.default("Invalid email or password", 401));
        }
        (0, jwt_1.sendToken)(user, 200, res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// LOGOUT USER
exports.logoutUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        const userId = ((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) || "";
        // Redis reference removed
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// UPDATE ACCESS TOKEN
exports.updateAccessToken = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token) {
            return next(new ErrorHandler_1.default("Please login to access this resource", 400));
        }
        const decoded = jsonwebtoken_1.default.verify(refresh_token, process.env.REFRESH_TOKEN);
        if (!decoded) {
            return next(new ErrorHandler_1.default("Refresh token not valid", 400));
        }
        // Redis reference removed
        // Replace with database lookup
        const user = yield user_model_1.default.findById(decoded.id);
        if (!user) {
            return next(new ErrorHandler_1.default("Please login to access this resource", 400));
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
            expiresIn: "5m",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
            expiresIn: "7d",
        });
        req.user = user;
        res.cookie("access_token", accessToken, jwt_1.accessTokenOptions);
        res.cookie("refresh_token", refreshToken, jwt_1.refreshTokenOptions);
        // Redis reference removed
        res.status(200).json({
            success: "success",
            accessToken,
            // refreshToken,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// GET USER INFO
exports.getUserInfo = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // const userId = req.user?._id;
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) ? req.user._id.toString() : "";
        (0, user_service_1.getUserById)(userId, res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// SOCIAL AUTH
exports.socialAuth = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, avatar } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            // sendToken(user, 200, res);
            const newUser = yield user_model_1.default.create({
                name,
                email,
                avatar,
            });
            (0, jwt_1.sendToken)(newUser, 200, res);
        }
        else {
            (0, jwt_1.sendToken)(user, 200, res);
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// UPDATE USER INFO
exports.UpdateUserInfo = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // console.log("User ID:", req.user?._id);
        // console.log("Request Body:", req.body);
        const { name, email } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const user = yield user_model_1.default.findById(userId);
        if (email && user) {
            const isEmailExist = yield user_model_1.default.findOne({ email });
            if (isEmailExist) {
                return next(new ErrorHandler_1.default("Email already exists", 400));
            }
        }
        if (name && user) {
            user.name = name;
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        // Redis reference removed
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updatePassword = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return next(new ErrorHandler_1.default("please enter old and new password", 400));
        }
        // const user = req.user;
        const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).select("+password");
        // social auth users have no password
        if ((user === null || user === void 0 ? void 0 : user.password) === undefined) {
            return next(new ErrorHandler_1.default("Invalid User", 404));
        }
        const isPasswordMatched = yield (user === null || user === void 0 ? void 0 : user.comparePassword(oldPassword));
        if (!isPasswordMatched) {
            return next(new ErrorHandler_1.default("Old password is incorrect", 400));
        }
        user.password = newPassword;
        yield user.save();
        // Redis reference removed
        res.status(201).json({
            success: true,
            message: "Password updated successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// UPDATE USER AVATAR / PROFILE PICTURE
exports.updateProfilePicture = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { avatar } = req.body;
        const userId = req.user._id;
        const user = yield user_model_1.default.findById(userId);
        if (avatar && user) {
            // if avatar exists
            if ((_a = user === null || user === void 0 ? void 0 : user.avatar) === null || _a === void 0 ? void 0 : _a.public_id) {
                // first delete old image
                yield cloudinary_1.default.v2.uploader.destroy((_b = user === null || user === void 0 ? void 0 : user.avatar) === null || _b === void 0 ? void 0 : _b.public_id);
                const myCloud = yield cloudinary_1.default.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150,
                    // crop: "scale",
                });
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
            else {
                const myCloud = yield cloudinary_1.default.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150,
                    // crop: "scale",
                });
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        // Redis reference removed
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// GET ALL USERS -- ONLY ADMIN
exports.getAllUsers = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, user_service_1.getAllUsersService)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// UPDATE USER ROLE --ONLY ADMIN
exports.updateRole = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, role } = req.body;
        (0, user_service_1.updateUserRoleService)(res, id, role);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// DELETE USER --ADMIN
exports.deleteUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        yield (user === null || user === void 0 ? void 0 : user.deleteOne({ id }));
        // Redis reference removed
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
