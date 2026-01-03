"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
/**
 * Global error handling middleware
 * Must be the LAST middleware in app.ts
 */
const errorHandler = (err, req, res, next) => {
    console.error("❌ Error:", err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorHandler = errorHandler;
