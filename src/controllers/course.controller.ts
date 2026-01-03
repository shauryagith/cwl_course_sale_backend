import { Request, Response } from "express";
import { Course } from "../models/course.model";
import { Subscription } from "../models/subscription.model";

interface AuthRequest extends Request {
  userId?: string;
}

/**
 * GET /courses
 * Fetch all courses
 */
export const getCourses = async (_req: Request, res: Response) => {
  try {
    const courses = await Course.find();

    // ✅ MAP thumbnail → image
    const mappedCourses = courses.map((course) => ({
      ...course.toObject(),
      image: course.image,
    }));

    return res.status(200).json(mappedCourses);
  } catch (error) {
    console.error("Get Courses Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * GET /courses/:id
 * Fetch single course by ID
 */
export const getCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // ✅ MAP thumbnail → image
    return res.status(200).json({
      ...course.toObject(),
      image: course.image,
    });
  } catch (error) {
    console.error("Get Course Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * GET /courses/user/my-courses
 * Fetch courses subscribed by logged-in user
 * (Protected Route)
 */
export const getMyCourses = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const subscriptions = await Subscription.find({
      userId: req.userId,
    })
      .populate("courseId")
      .sort({ subscribedAt: -1 });

    // ✅ MAP thumbnail → image inside populated course
    const result = subscriptions.map((sub: any) => ({
      _id: sub._id,
      course: sub.courseId
        ? {
            ...sub.courseId.toObject(),
            image: sub.courseId.thumbnail,
          }
        : null,
      pricePaid: sub.pricePaid,
      subscribedAt: sub.subscribedAt,
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error("My Courses Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
