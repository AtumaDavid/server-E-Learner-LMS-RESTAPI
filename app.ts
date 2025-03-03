import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.routes";
import courseRouter from "./routes/course.routes";
import orderRouter from "./routes/order.routes";
import notificationRoute from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
require("dotenv").config();

// cors
app.use(
  cors({
    // origin: process.env.ORIGIN,
    // origin: [
    //   "http://localhost:3000",
    //   "http://localhost:3001",
    //   "https://lms-frontend-next.vercel.app",
    // ],
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://lms-frontend-next.vercel.app",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// cookie parser
app.use(cookieParser());

// body parser
app.use(express.json({ limit: "50mb" }));

// routes
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", notificationRoute);
app.use("/api/v1", analyticsRouter);
app.use("/api/v1", layoutRouter);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "api working",
  });
});

// unknown api
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  (err.statusCode = 404), next(err);
});

app.use(ErrorMiddleware);
