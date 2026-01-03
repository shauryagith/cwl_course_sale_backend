import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { courseRoutes } from "./course.routes";
import { subscriptionRoutes } from "./subscription.routes";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/courses", courseRoutes);
routes.use("/", subscriptionRoutes);

export default routes;