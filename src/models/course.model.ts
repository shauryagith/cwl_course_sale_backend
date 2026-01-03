import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },

    price: { type: Number, required: true },
    originalPrice: { type: Number },

    isFree: { type: Boolean, default: false },

    // ✅ CHANGE HERE
    image: { type: String, required: true },

    duration: { type: String, required: true },
    lessons: { type: Number, required: true },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },

    instructor: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export const Course = model("Course", courseSchema);
