"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = void 0;
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// ✅ PROTECTED ROUTE FIRST
router.get("/user/my-courses", auth_middleware_1.protect, course_controller_1.getMyCourses);
// ✅ PUBLIC ROUTES AFTER
router.get("/", course_controller_1.getCourses);
router.get("/:id", course_controller_1.getCourse);
exports.courseRoutes = router;
