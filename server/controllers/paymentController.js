import axios from "axios";
import Order from "../models/order.js";
import Cart from "../models/cart.js";
import Checkout from "../models/checkout.js";
import { createOrderFromPayment } from "./orderController.js";


export const initializePayment = async (req, res) => {
    try {

        const {
            email,
            amount,
            shippingAddress,
            deliveryMethod,
            shippingFee,
            discount = 0
        } = req.body;

        const userId = req.user.userID;
        // Save or update pending checkout
        const checkout = await Checkout.findOneAndUpdate(
            { user: userId },
            {
                user: userId,
                shippingAddress,
                deliveryMethod,
                shippingFee,
                discount,
                totalAmount: amount,
                status: "Pending"
            },
            {
                returnDocument: "after",
                upsert: true
            }
        );

        console.log({
            email,
            amount,
            shippingAddress,
            deliveryMethod,
            shippingFee,
            userId
        });


        // Initialize Paystack
        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email,
                amount: amount * 100,

                callback_url:
                    "https://mutpel-store.vercel.app/payment-success",
                metadata: {
                    userId
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // Save Paystack reference
        checkout.paymentReference = response.data.data.reference;

        await checkout.save();

        res.status(200).json(response.data);

    } catch (error) {

        console.log("PAYMENT INITIALIZE ERROR");
        console.log(error.response?.data || error);

        res.status(500).json({
            success: false,
            message: error.response?.data?.message || error.message,
            error: error.response?.data || error.message,
        });
    }
};




export const verifyPayment = async (req, res) => {
    try {
        const { reference } = req.body;

        // Verify with Paystack
        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        const payment = response.data.data;

        if (payment.status !== "success") {
            return res.status(400).json({
                success: false,
                message: "Payment not successful",
            });
        }

        // Prevent duplicate orders
        const existingOrder = await Order.findOne({
            paymentReference: reference,
        });

        if (existingOrder) {
            return res.status(200).json({
                success: true,
                message: "Order already exists",
                order: existingOrder,
            });
        }

        // Find pending checkout
        const checkout = await Checkout.findOne({
            paymentReference: reference,
        });

        if (!checkout) {
            return res.status(404).json({
                success: false,
                message: "Checkout not found",
            });
        }

        // Create the order
        const order = await createOrderFromPayment(
            checkout,
            reference
        );

        // Remove temporary checkout
        await Checkout.findByIdAndDelete(checkout._id);

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            order,
        });

    } catch (error) {
        console.log(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Payment verification failed",
        });
    }
};