import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export const signToken = (userId: string) =>
  jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "7d" });
