"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const course_controller_1 = require("../controllers/course.controller");
const courseRouter = express_1.default.Router();
courseRouter.post("/create-course", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), course_controller_1.uploadCourse);
courseRouter.put("/edit-course/:id", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), course_controller_1.editCourse); // id = course id
// GET SINGLE COURSE(WITHOUT PURCHASE)
courseRouter.get("/get-course/:id", course_controller_1.getSingleCourse); // id = course id
// GET ALL COURSES(WITHOUT PURCHASE)
courseRouter.get("/get-courses", course_controller_1.getAllCourses);
// GET A COURSE CONTENT FOR USER(VALID USER)
courseRouter.get("/get-course-content/:id", auth_1.isAuthenticated, course_controller_1.getCourseByUser); // id = course id
// ADD A COMMENT/QUESTION T COURSE
courseRouter.put("/add-question", auth_1.isAuthenticated, course_controller_1.addQuestion);
// REPLY QUESTION
courseRouter.put("/reply-question", auth_1.isAuthenticated, course_controller_1.addAnswer);
// ADD REVIEW
courseRouter.put("/add-review/:id", auth_1.isAuthenticated, course_controller_1.addReview);
// REPLY REVIEW
courseRouter.put("/reply-review", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), course_controller_1.replyReview);
// GET ALL COURSES --ADMIN
courseRouter.get("/get-courses-admin", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), course_controller_1.getAllCoursesAdmin);
// DELETE COURSE --ADMIN
courseRouter.delete("/delete-course/:id", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), course_controller_1.deleteCourse);
exports.default = courseRouter;
