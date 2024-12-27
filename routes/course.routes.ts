import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
); // id = course id

// GET SINGLE COURSE(WITHOUT PURCHASE)
courseRouter.get("/get-course/:id", getSingleCourse); // id = course id

// GET ALL COURSES(WITHOUT PURCHASE)
courseRouter.get("/get-courses", getAllCourses);

// GET A COURSE CONTENT FOR USER(VALID USER)
courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser); // id = course id

export default courseRouter;
