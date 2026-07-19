import express from "express";
import User from "../models/users.js";
import Product from "../models/products.js";
import Category from "../models/category.js";
import Order from "../models/orders.js"; 


//get dashboard stats

export const dashboardStats = async (req, res) => {

    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalOrders = Order.length;

    const pendingOrders = Order.filter(
        order => order.orderStatus === "Pending"
    ).length;

    const deliveredOrders = Order.filter(
        order => order.orderStatus === "Delivered"
    ).length;

    const totalRevenue = orders
        .filter(order => order.paymentStatus === "Paid")
        .reduce((sum, order) => sum + order.totalAmount, 0);

        res.status(200).json({
            totalUsers,
            totalProducts,
            totalCategories,
            totalOrders,
            pendingOrders,
            deliveredOrders,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}