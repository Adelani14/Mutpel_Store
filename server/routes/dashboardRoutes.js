import express from "express";
import { dashboardStats } from "../controllers/dashboardstatsController.js";
import isAuth from "../middleware/isAuth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/stats", isAuth, isAdmin, dashboardStats);

export default router;


