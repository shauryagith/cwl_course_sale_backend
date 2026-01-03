import { Request, Response } from "express";
import { User } from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/token";

/**
 * SIGNUP CONTROLLER
 * POST /auth/signup
 */
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as {
      name?: string;
      email?: string;
      password?: string;
    };

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await hashPassword(password);

    // 4️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Remove password from response
    const { password: _, ...safeUser } = user.toObject();

    return res.status(201).json(safeUser);
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * LOGIN CONTROLLER
 * POST /auth/login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 3️⃣ Compare password
    const isMatch = await comparePassword(password, user.password || "");
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 4️⃣ Generate JWT (FIXED TYPE ISSUE)
    const token = signToken(user._id.toString());

    // 5️⃣ Remove password from response
    const { password: _, ...safeUser } = user.toObject();

    return res.status(200).json({
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
