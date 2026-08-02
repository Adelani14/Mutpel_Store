import Category from "../models/category.js";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";





export const createCategory = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).json({
                message: "Category title is required",
            });
        }

        const slug = req.body.title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");

        const categoryExists = await Category.findOne({ slug });

        if (categoryExists) {
            return res.status(400).json({
                message: "Category already exists",
            });
        }

        let image = null;

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "categories",
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });

            image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
        }



        const category = await Category.create({
            title: req.body.title,
            slug,
            description: req.body.description,
            featured: req.body.featured === "true",
            priority: Number(req.body.priority) || 0,
            imagespath: image ? [image] : []

            // imagespath: req.file
            //     ? [
            //         {
            //             url: req.file.path,
            //             public_id: req.file.filename,
            //         },
            //     ]
            //     : [],

        });

        res.status(201).json(category);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
};


// GET ALL CATEGORIES
export const getCategories = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    try {

        const categories = await Category.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json(categories);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// GET CATEGORY BY ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            category,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
    try {
        const { title, description, featured, priority } = req.body;

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        if (req.file) {
            if (
                category.imagespath.length > 0 &&
                category.imagespath[0].public_id
            ) {
                await cloudinary.uploader.destroy(
                    category.imagespath[0].public_id
                );
            }

            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "categories" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });

            category.imagespath = [
                {
                    url: result.secure_url,
                    public_id: result.public_id,
                },
            ];
        }

        if (title !== undefined) {
            category.title = title;
            category.slug = title
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-");
        }

        if (description !== undefined) {
            category.description = description;
        }

        if (featured !== undefined) {
            category.featured =
                featured === true || featured === "true";
        }

        if (priority !== undefined) {
            category.priority = priority;
        }

        await category.save();

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};


// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }
        if (category.imagespath.length > 0) {
            await cloudinary.uploader.destroy(
                category.imagespath[0].public_id
            );
        }
        await category.deleteOne();
        res.json({ message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET FEATURED CATEGORIES
export const getFeaturedCategories = async (req, res) => {
    try {

        const categories = await Category.find({
            featured: true
        });

        res.json(categories);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

