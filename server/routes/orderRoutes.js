import express from "express";
import {
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    getRecentOrders,
} from "../controllers/orderController.js";

import isAuth from "../middleware/isAuth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

// Customer routes
router.get("/my-orders", isAuth, getMyOrders);
router.get("/:id", isAuth, getOrderById);

// Admin routes
router.get("/", isAuth, isAdmin, getAllOrders);
router.get("/recent-orders", isAuth, isAdmin, getRecentOrders);
router.patch("/:id/status", isAuth, isAdmin, updateOrderStatus);

export default router;