import Order from "../models/order.js";
import Cart from "../models/cart.js";


export const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.user.id
        })
            .populate("user", "fullName email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


export const getOrderById = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("user", "fullName email")
            .populate("orderItems.product");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // If user is not admin and doesn't own the order
        if (
            req.user.role !== "admin" &&
            order.user._id.toString() !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


export const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user", "fullName email")
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            orders

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


export const updateOrderStatus = async (req, res) => {

    try {

        const { orderStatus } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found"

            });

        }

        const validStatuses = [
            "Pending",
            "Confirmed",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ];

        if (!validStatuses.includes(orderStatus)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            });
        }

        order.orderStatus = orderStatus;

        if (orderStatus === "Delivered") {

            order.deliveredAt = new Date();

        }

        await order.save();

        res.status(200).json({

            success: true,

            order

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


export const createOrderFromPayment = async (
    checkout,
    paymentReference
) => {

    // Find customer's cart
    const cart = await Cart.findOne({
        user: checkout.user
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }

    const orderItems = [];
    let itemsPrice = 0;

    for (const item of cart.items) {

        const product = item.product;

        if (!product) {
            throw new Error("Product no longer exists.");
        }

        // Check stock
        if (product.stockCount < item.quantity) {
            throw new Error(`${product.title} is out of stock.`);
        }

        const subtotal = product.price * item.quantity;

        itemsPrice += subtotal;

        orderItems.push({

            product: product._id,

            title: product.title,

            image: product.imagespath[0]?.url || "",

            price: product.price,

            quantity: item.quantity,

            size: item.size,

            color: item.color,

            subtotal

        });

        // Reduce stock
        product.stockCount -= item.quantity;

        await product.save();

    }

    const shippingFee = checkout.shippingFee;

    const discount = checkout.discount;

    const totalAmount = itemsPrice + shippingFee - discount;


    const order = await Order.create({

        user: checkout.user,

        orderItems,

        shippingAddress: checkout.shippingAddress,

        deliveryMethod: checkout.deliveryMethod,

        itemsPrice,

        shippingFee,

        discount,

        totalAmount,

        paymentMethod: "Paystack",

        paymentStatus: "Paid",

        paymentReference,

        paidAt: new Date()

    });

    // Clear customer's cart
    cart.items = [];

    await cart.save();
    return order;

};