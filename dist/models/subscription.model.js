"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const mongoose_1 = require("mongoose");
const subscriptionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
/* ✅ Prevent duplicate subscriptions */
subscriptionSchema.index({ userId: 1, courseId: 1 }, { unique: true });
exports.Subscription = (0, mongoose_1.model)("Subscription", subscriptionSchema);
