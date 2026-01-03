import { Router } from "express";
import { subscribe } from "../controllers/subscription.controller";
import { protect } from "../middlewares/auth.middleware";

export const subscriptionRoutes = Router();
subscriptionRoutes.post("/subscribe", protect, subscribe);
export default subscriptionRoutes;
