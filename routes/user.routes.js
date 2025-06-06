"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middleware/auth");
const userRouter = express_1.default.Router();
userRouter.post("/registration", user_controller_1.registerUser);
userRouter.post("/activate-user", user_controller_1.activateUser);
userRouter.post("/login", user_controller_1.loginUser);
userRouter.post("/social-auth", user_controller_1.socialAuth);
userRouter.get("/logout", auth_1.isAuthenticated, user_controller_1.logoutUser);
userRouter.get("/refreshtoken", user_controller_1.updateAccessToken);
userRouter.get("/userinfo", auth_1.isAuthenticated, user_controller_1.getUserInfo);
userRouter.put("/update-userinfo", auth_1.isAuthenticated, user_controller_1.UpdateUserInfo);
userRouter.put("/update-password", auth_1.isAuthenticated, user_controller_1.updatePassword);
userRouter.put("/update-user-avatar", auth_1.isAuthenticated, user_controller_1.updateProfilePicture);
// GET ALL USERS --ADMIN
userRouter.get("/get-users", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), user_controller_1.getAllUsers);
// UPDATE USER ROLES --ADMIN
userRouter.put("/update-user-role", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), user_controller_1.updateRole);
// DELETE USER ROLES --ADMIN
userRouter.delete("/delete-user/:id", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), user_controller_1.deleteUser);
exports.default = userRouter;
