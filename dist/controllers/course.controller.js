"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyCourses = exports.getCourse = exports.getCourses = void 0;
const course_model_1 = require("../models/course.model");
const subscription_model_1 = require("../models/subscription.model");
/**
 * GET /courses
 * Fetch all courses
 */
const getCourses = async (_req, res) => {
    try {
        const courses = await course_model_1.Course.find();
        // ✅ MAP thumbnail → image
        const mappedCourses = courses.map((course) => ({
            ...course.toObject(),
            image: course.image,
        }));
        return res.status(200).json(mappedCourses);
    }
    catch (error) {
        console.error("Get Courses Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.getCourses = getCourses;
/**
 * GET /courses/:id
 * Fetch single course by ID
 */
const getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await course_model_1.Course.findById(id);
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
    }
    catch (error) {
        console.error("Get Course Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.getCourse = getCourse;
/**
 * GET /courses/user/my-courses
 * Fetch courses subscribed by logged-in user
 * (Protected Route)
 */
const getMyCourses = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const subscriptions = await subscription_model_1.Subscription.find({
            userId: req.userId,
        })
            .populate("courseId")
            .sort({ subscribedAt: -1 });
        // ✅ MAP thumbnail → image inside populated course
        const result = subscriptions.map((sub) => ({
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
    }
    catch (error) {
        console.error("My Courses Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.getMyCourses = getMyCourses;
