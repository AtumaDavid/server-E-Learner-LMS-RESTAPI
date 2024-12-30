import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  addReview,
  deleteCourse,
  editCourse,
  getAllCourses,
  getAllCoursesAdmin,
  getCourseByUser,
  getSingleCourse,
  replyReview,
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

// ADD A COMMENT/QUESTION T COURSE
courseRouter.put("/add-question", isAuthenticated, addQuestion);

// REPLY QUESTION
courseRouter.put("/reply-question", isAuthenticated, addAnswer);

// ADD REVIEW
courseRouter.put("/add-review/:id", isAuthenticated, addReview);

// REPLY REVIEW
courseRouter.put(
  "/reply-review",
  isAuthenticated,
  authorizeRoles("admin"),
  replyReview
);

// GET ALL COURSES --ADMIN
courseRouter.get(
  "/get-courses-admin",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCoursesAdmin
);

// DELETE COURSE --ADMIN
courseRouter.delete(
  "/delete-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse
);

export default courseRouter;
