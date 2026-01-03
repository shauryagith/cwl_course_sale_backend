import { Request, Response } from "express";
import { Course } from "../models/course.model";
import { Subscription } from "../models/subscription.model";

interface AuthRequest extends Request {
  userId?: string;
}

export const subscribe = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId, promoCode } = req.body;

    /* 1️⃣ Auth check */
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    /* 2️⃣ Get course */
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    /* 3️⃣ Prevent duplicate subscription */
    const existing = await Subscription.findOne({
      userId: req.userId,
      courseId,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Already subscribed to this course" });
    }

    /* 4️⃣ Price calculation */
    let pricePaid = 0;

    if (!course.isFree) {
      if (promoCode !== "BFSALE25") {
        return res.status(400).json({
          message: "Valid promo code required for paid courses",
        });
      }

      pricePaid = Math.round(course.price * 0.5);
    }

    /* 5️⃣ Create subscription */
    const subscription = await Subscription.create({
      userId: req.userId,
      courseId: course._id,
      pricePaid,
    });

    /* 6️⃣ Return success */
    return res.status(201).json({
      message: "Subscribed successfully",
      subscriptionId: subscription._id,
    });
  } catch (error) {
    console.error("Subscription Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
