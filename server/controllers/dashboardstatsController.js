import User from "../models/users.js";
import Product from "../models/products.js";
import Category from "../models/category.js";
import Order from "../models/order.js";

export const dashboardStats = async (req, res) => {
   const nigeriaFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});
    
    
    
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

const today = nigeriaFormatter.format(now);

const nigeriaNow = new Date(
    now.toLocaleString("en-US", {
        timeZone: "Africa/Lagos",
    })
);

const currentMonth = nigeriaNow.getMonth();
const currentYear = nigeriaNow.getFullYear();

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

        const revenueToday = paidOrders.reduce((sum, order) => {
    const orderDate = nigeriaFormatter.format(
        new Date(order.createdAt)
    );

    return orderDate === today
        ? sum + order.totalAmount
        : sum;
}, 0);
        const revenueThisMonth = paidOrders.reduce((sum, order) => {
    const date = new Date(
        new Date(order.createdAt).toLocaleString("en-US", {
            timeZone: "Africa/Lagos",
        })
    );

    return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
    )
        ? sum + order.totalAmount
        : sum;
}, 0);

        const revenueThisYear = paidOrders.reduce((sum, order) => {
    const date = new Date(
        new Date(order.createdAt).toLocaleString("en-US", {
            timeZone: "Africa/Lagos",
        })
    );

    return date.getFullYear() === currentYear
        ? sum + order.totalAmount
        : sum;
}, 0);

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