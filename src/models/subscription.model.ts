import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    pricePaid: {
      type: Number,
      required: true,
    },

    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

/* ✅ Prevent duplicate subscriptions */
subscriptionSchema.index(
  { userId: 1, courseId: 1 },
  { unique: true }
);

export const Subscription = model("Subscription", subscriptionSchema);
