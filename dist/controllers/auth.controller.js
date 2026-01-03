"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const user_model_1 = require("../models/user.model");
const hash_1 = require("../utils/hash");
const token_1 = require("../utils/token");
/**
 * SIGNUP CONTROLLER
 * POST /auth/signup
 */
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // 1️⃣ Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        // 2️⃣ Check existing user
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }
        // 3️⃣ Hash password
        const hashedPassword = await (0, hash_1.hashPassword)(password);
        // 4️⃣ Create user
        const user = await user_model_1.User.create({
            name,
            email,
            password: hashedPassword,
        });
        // 5️⃣ Remove password from response
        const { password: _, ...safeUser } = user.toObject();
        return res.status(201).json(safeUser);
    }
    catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.signup = signup;
/**
 * LOGIN CONTROLLER
 * POST /auth/login
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1️⃣ Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        // 2️⃣ Find user
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        // 3️⃣ Compare password
        const isMatch = await (0, hash_1.comparePassword)(password, user.password || "");
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        // 4️⃣ Generate JWT (FIXED TYPE ISSUE)
        const token = (0, token_1.signToken)(user._id.toString());
        // 5️⃣ Remove password from response
        const { password: _, ...safeUser } = user.toObject();
        return res.status(200).json({
            token,
            user: safeUser,
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.login = login;
