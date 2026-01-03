import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

interface AuthRequest extends Request {
  userId?: string;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No header or wrong format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // ❌ Token missing / invalid string
    if (!token || token === "undefined") {
      return res.status(401).json({ message: "Invalid token" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET) as {
      userId: string;
    };

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("❌ JWT ERROR:", error);
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};

