import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        shortDescription: {
            type: String,
            default: "",
        },

        price: {
            type: Number,
            required: true,
        },

        previousPrice: {
            type: Number,
            default: 0,
        },
        discountAmount: {
            type: Number,
            default: 0,
        },

        discountPercentage: {
            type: Number,
            default: 0,
        },

        stockCount: {
            type: Number,
            required: true,
            default: 1,
        },

        sizes: [{
            type: String,
        }],

        colors: [{
            type: String,
        }],

        sku: {
            type: String,
            default: "",
        },

        brand: {
            type: String,
            default: "",
        },

        imagespath: [
            {
                type: String,
            },
        ],

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        ratings: {
            type: Number,
            default: 0,
        },

        numReviews: {
            type: Number,
            default: 0,
        },

        featured: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);


export default mongoose.model("Product", productSchema);