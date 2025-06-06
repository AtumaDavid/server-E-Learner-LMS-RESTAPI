"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_1 = require("./middleware/error");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const notification_route_1 = __importDefault(require("./routes/notification.route"));
const analytics_route_1 = __importDefault(require("./routes/analytics.route"));
const layout_route_1 = __importDefault(require("./routes/layout.route"));
require("dotenv").config();
// body parser
exports.app.use(express_1.default.json({ limit: "50mb" }));
// cookie parser
exports.app.use((0, cookie_parser_1.default)());
// cors
exports.app.use((0, cors_1.default)({
    origin: process.env.ORIGIN,
    // credentials: true,
    // optionsSuccessStatus: 200,
}));
// routes
exports.app.use("/api/v1", user_routes_1.default);
exports.app.use("/api/v1", course_routes_1.default);
exports.app.use("/api/v1", order_routes_1.default);
exports.app.use("/api/v1", notification_route_1.default);
exports.app.use("/api/v1", analytics_route_1.default);
exports.app.use("/api/v1", layout_route_1.default);
// testing api
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "api working",
    });
});
// unknown api
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    (err.statusCode = 404), next(err);
});
exports.app.use(error_1.ErrorMiddleware);
