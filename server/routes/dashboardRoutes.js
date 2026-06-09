import express from "express";
import { dashboardStats } from "../controllers/dashboardstatsController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.get("/stats", isAuth, dashboardStats);

export default router;


