import express from "express";
import {
  UpdateUserInfo,
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registerUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.post("/social-auth", socialAuth);

userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.get("/refreshtoken", updateAccessToken);

userRouter.get("/userinfo", isAuthenticated, getUserInfo);

userRouter.put("/update-userinfo", isAuthenticated, UpdateUserInfo);

userRouter.put("/update-password", isAuthenticated, updatePassword);

userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture);

export default userRouter;
