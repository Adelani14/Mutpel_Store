import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        shippingAddress: {
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

            postalCode: {
                type: String,
                default: "",
            },
        },

        deliveryMethod: {
            type: String,
            enum: [
                "Pickup",
                "Home Delivery",
                "Interstate Delivery"
            ],
            default: "Home Delivery",
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

        paymentReference: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Paid",
                "Cancelled",
                "Expired",
            ],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Checkout", checkoutSchema);