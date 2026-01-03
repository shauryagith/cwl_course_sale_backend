import { Request, Response, NextFunction } from "express";

/**
 * Global error handling middleware
 * Must be the LAST middleware in app.ts
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Error:", err);

  const statusCode = err.statusCode || 500;
  const message =
    err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
