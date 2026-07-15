import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        imagespath: [
            {
                url: String,
                public_id: String,
            }
        ],

        description: {
            type: String,
            default: "",
        },


        priority: {
            type: String,
            default: "Normal Priority",
        },

        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// const Category = mongoose.model("Category", categorySchema);

export default mongoose.model("Category", categorySchema);