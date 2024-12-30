import { IOrder } from "./../models/order.model";
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
// import OrderModel from "../models/order.model";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import { getAllOrdersService, newOrder } from "../services/order.service";

// CREATE ORDER
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract courseId and payment information from request body
      const { courseId, payment_info } = req.body as IOrder;

      // Find the current user by ID
      const user = await userModel.findById(req.user?._id);

      // Check if the user has already purchased the course --1
      const courseExistInUser = user?.courses.some(
        (course: any) => course.courseId === courseId
      );

      if (courseExistInUser) {
        return next(new ErrorHandler("Course already purchased", 400));
      }

      // Find the course by ID
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      // Prepare order data
      const data: any = {
        courseId: course?._id,
        userId: user?._id,
        payment_info,
      };

      // Prepare email data for order confirmation
      const mailData = {
        order: {
          _id: course._id?.toString().slice(0, 6),
          name: course.title,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      // Send confirmation email to user
      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      // Add course to user's purchased courses
      //   user?.courses.push(course?._id);
      user?.courses.push({ courseId: courseId });

      // Save user information
      await user?.save();

      // Create a notification for the user
      await NotificationModel.create({
        userId: user?._id,
        title: "New Order",
        message: `You have purchased ${course?.title}`,
      });

      // Increment course purchase count
      //   console.log("Before increment:", course.purchased);
      course.purchased = (course.purchased || 0) + 1;
      //   console.log("After increment:", course.purchased);

      await course.save();

      // Create new order using order service
      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// GET ALL ORDERS -- ONLY ADMIN
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
