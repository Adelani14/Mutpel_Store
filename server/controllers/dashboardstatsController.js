import User from "../models/users.js";
import Product from "../models/products.js";
import Category from "../models/category.js";
import Order from "../models/order.js";

export const dashboardStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalProducts,
            totalCategories,
            orders,
        ] = await Promise.all([
            User.countDocuments(),
            Product.countDocuments(),
            Category.countDocuments(),
            Order.find(),
        ]);

        const now = new Date();
        const today = now.toDateString();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Order Counts
        const totalOrders = orders.length;

        const pendingOrders = orders.filter(
            order => order.orderStatus === "Pending"
        ).length;

        const deliveredOrders = orders.filter(
            order => order.orderStatus === "Delivered"
        ).length;

        // Paid Orders
        const paidOrders = orders.filter(
            order => order.paymentStatus === "Paid"
        );

        // Revenue
        const totalRevenue = paidOrders.reduce(
            (sum, order) => sum + order.totalAmount,
            0
        );

        const revenueToday = paidOrders
            .filter(order =>
                new Date(order.createdAt).toDateString() === today
            )
            .reduce((sum, order) => sum + order.totalAmount, 0);

        const revenueThisMonth = paidOrders
            .filter(order => {
                const date = new Date(order.createdAt);

                return (
                    date.getMonth() === currentMonth &&
                    date.getFullYear() === currentYear
                );
            })
            .reduce((sum, order) => sum + order.totalAmount, 0);

        const revenueThisYear = paidOrders
            .filter(order =>
                new Date(order.createdAt).getFullYear() === currentYear
            )
            .reduce((sum, order) => sum + order.totalAmount, 0);

        // Average Order Value
        const averageOrderValue =
            paidOrders.length > 0
                ? totalRevenue / paidOrders.length
                : 0;

        // Products Sold
        const productsSold = paidOrders.reduce((total, order) => {
            return (
                total +
                order.orderItems.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                )
            );
        }, 0);

        res.status(200).json({
            totalUsers,
            totalProducts,
            totalCategories,

            totalOrders,
            pendingOrders,
            deliveredOrders,

            revenueToday,
            revenueThisMonth,
            revenueThisYear,
            totalRevenue,

            averageOrderValue,
            productsSold,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
        });
    }
};