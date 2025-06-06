import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  getNotification,
  updateNotificationStatus,
} from "../controllers/notification.controller";

const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notification",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotification
);

notificationRoute.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotificationStatus
);

export default notificationRoute;
