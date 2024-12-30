import express from "express";
import {
  UpdateUserInfo,
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
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

// GET ALL USERS --ADMIN
userRouter.get(
  "/get-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

// UPDATE USER ROLES --ADMIN
userRouter.put(
  "/update-user-role",
  isAuthenticated,
  authorizeRoles("admin"),
  updateRole
);

// DELETE USER ROLES --ADMIN
userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default userRouter;
