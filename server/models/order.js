import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        size: {
            type: String,
            default: "",
        },

        color: {
            type: String,
            default: "",
        },

        subtotal: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);



const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        orderItems: [orderItemSchema],

        shippingAddress: shippingAddressSchema,

        deliveryMethod: {
            type: String,
            enum: ["Home Delivery", "Pickup"],
            default: "Home Delivery",
        },

        itemsPrice: {
            type: Number,
            required: true,
        },

        shippingFee: {
            type: Number,
            default: 0,
        },

        discount: {
            type: Number,
            default: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["Paystack"],
            default: "Paystack",
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed", "Refunded"],
            default: "Pending",
        },

        paymentReference: {
            type: String,
            unique: true,
            sparse: true,
        },

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },

        paidAt: Date,

        deliveredAt: Date,
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;