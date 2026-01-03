"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const protect = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, env_1.ENV.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.error("❌ JWT ERROR:", error);
        return res.status(401).json({ message: "Token expired or invalid" });
    }
};
exports.protect = protect;
