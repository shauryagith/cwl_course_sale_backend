import { Router } from "express";
import {
  getCourses,
  getCourse,
  getMyCourses,
} from "../controllers/course.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// ✅ PROTECTED ROUTE FIRST
router.get("/user/my-courses", protect, getMyCourses);

// ✅ PUBLIC ROUTES AFTER
router.get("/", getCourses);
router.get("/:id", getCourse);

export const courseRoutes = router;


