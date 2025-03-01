"use strict";
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
exports.getAllOrders = exports.createOrder = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
// import OrderModel from "../models/order.model";
const user_model_1 = __importDefault(require("../models/user.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const order_service_1 = require("../services/order.service");
// CREATE ORDER
exports.createOrder = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Extract courseId and payment information from request body
        const { courseId, payment_info } = req.body;
        // Find the current user by ID
        const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        // Check if the user has already purchased the course --1
        const courseExistInUser = user === null || user === void 0 ? void 0 : user.courses.some((course) => course.courseId === courseId);
        if (courseExistInUser) {
            return next(new ErrorHandler_1.default("Course already purchased", 400));
        }
        // Find the course by ID
        const course = yield course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        // Prepare order data
        const data = {
            courseId: course === null || course === void 0 ? void 0 : course._id,
            userId: user === null || user === void 0 ? void 0 : user._id,
            payment_info,
        };
        // Prepare email data for order confirmation
        const mailData = {
            order: {
                _id: (_b = course._id) === null || _b === void 0 ? void 0 : _b.toString().slice(0, 6),
                name: course.title,
                price: course.price,
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
            },
        };
        const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/order-confirmation.ejs"), { order: mailData });
        // Send confirmation email to user
        try {
            if (user) {
                yield (0, sendMail_1.default)({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData,
                });
            }
        }
        catch (error) {
            return next(new ErrorHandler_1.default(error.message, 500));
        }
        // Add course to user's purchased courses
        //   user?.courses.push(course?._id);
        user === null || user === void 0 ? void 0 : user.courses.push({ courseId: courseId });
        // Save user information
        yield (user === null || user === void 0 ? void 0 : user.save());
        // Create a notification for the user
        yield notification_model_1.default.create({
            userId: user === null || user === void 0 ? void 0 : user._id,
            title: "New Order",
            message: `You have purchased ${course === null || course === void 0 ? void 0 : course.title}`,
        });
        // Increment course purchase count
        //   console.log("Before increment:", course.purchased);
        course.purchased = (course.purchased || 0) + 1;
        //   console.log("After increment:", course.purchased);
        yield course.save();
        // Create new order using order service
        (0, order_service_1.newOrder)(data, res, next);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// GET ALL ORDERS -- ONLY ADMIN
exports.getAllOrders = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, order_service_1.getAllOrdersService)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
