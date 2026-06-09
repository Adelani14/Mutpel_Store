import express from "express";
import User from "../models/users.js";
import Product from "../models/products.js";
import Category from "../models/category.js";


//get dashboard stats

export const dashboardStats = async (req, res) => {

    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalCategories = await Category.countDocuments();

        res.status(200).json({
            totalUsers,
            totalProducts,
            totalCategories
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}