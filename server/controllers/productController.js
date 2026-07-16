import Product from "../models/products.js";
import cloudinary from "../config/cloudinary.js";
// CREATE PRODUCT

export const createProduct = async (req, res) => {
    try {

        const {
            title,
            price,
            description,
            category,
            previousPrice,
            discountAmount,
            shortDescription,
            brand,
            stockCount,
            discountPercentage,
            sku,
            ratings,
            numReviews,
            isActive,
            featured
        } = req.body;


        const sizes = req.body.sizes
            ? req.body.sizes.split(",").map(size => size.trim())
            : [];

        const colors = req.body.colors
            ? req.body.colors.split(",").map(color => color.trim())
            : [];

        const slug = title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");

        // Cloudinary image URL
        const imagespath = req.files
            ? req.files.map(file => ({
                url: file.path,
                public_id: file.filename
            }))
            : [];


        const product = new Product({
            title,
            slug,
            price,
            sizes,
            colors,
            description,
            imagespath,
            category,
            previousPrice,
            discountAmount,
            shortDescription,
            brand,
            stockCount,
            discountPercentage,
            sku,
            ratings,
            numReviews,
            isActive,
            featured
        });

        await product.save();

        res.status(201).json(product);

    } catch (error) {

        console.error("FULL ERROR:", error);

        res.status(500).json({
            message: error.message,
            error
        });

    }
};


// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    try {
        const [products, total] = await Promise.all([
            Product.find()
                .populate("category")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            Product.countDocuments()
        ]);

        res.json({
            products,
            page,
            totalPages: Math.ceil(total / limit),
            total
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTopDeals = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    try {
        const [products, total] = await Promise.all([
            Product.find({
                discountPercentage: { $gte: 10 }
            })
                .sort({ discountPercentage: -1 })
                .skip(skip)
                .limit(limit),

            Product.countDocuments({
                discountPercentage: { $gte: 10 }
            })
        ]);

        res.json({
            products,
            page,
            totalPages: Math.ceil(total / limit),
            total,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//getfeatureproduct
export const getFeaturedProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    try {
        const products = await Product.find({
            featured: true,
        })
            .populate("category")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments({
            featured: true,
        });

        res.json({
            products,
            page,
            totalPages: Math.ceil(total / limit),
            total,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//new arriver
// GET NEW ARRIVALS
export const getNewArrivals = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    try {
        const products = await Product.find()
            .populate("category")
            .sort({ createdAt: -1 }) // newest first
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments();

        res.json({
            products,
            page,
            totalPages: Math.ceil(total / limit),
            total,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// GET SINGLE PRODUCT by id
export const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




export const searchProducts = async (req, res) => {
    try {

        const { q } = req.query;

        if (!q) {
            return res.json({
                success: true,
                products: [],
            });
        }

        const products = await Product.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { brand: { $regex: q, $options: "i" } },
                { shortDescription: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
                { sku: { $regex: q, $options: "i" } },
            ],
        }).populate("category");

        res.status(200).json({
            success: true,
            products,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// GET PRODUCTS BY CATEGORY
export const getRelatedProducts = async (req, res) => {
    try {
        const { categoryId, productId } = req.params;

        const products = await Product.find({
            category: categoryId,
            _id: { $ne: productId },
        }).limit(8);

        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async (req, res) => {
    try {

        const { categoryId } = req.params;

        const products = await Product.find({
            category: categoryId
        })
            .populate("category")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    try {

        const {
            title,
            price,
            description,
            category,
            previousPrice,
            discountAmount,
            shortDescription,
            brand,
            stockCount,
            discountPercentage,
            sku,
            ratings,
            numReviews,
            isActive,
            featured
        } = req.body;

        const slug = title
            ? `${title.toLowerCase().trim().replace(/\s+/g, "-")}-${Date.now()}`
            : "";

        let updatedData = {
            title,
            slug,
            price,
            description,
            category,
            previousPrice,
            discountAmount,
            shortDescription,
            brand,
            stockCount,
            discountPercentage,
            sku,
            ratings,
            numReviews,
            isActive,
            featured
        };

        const existingProduct = await Product.findById(req.params.id);

        if (!existingProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (req.files && req.files.length > 0) {

            // Delete old images
            for (const image of existingProduct.imagespath) {
                if (image.public_id) {
                    try {
                        await cloudinary.uploader.destroy(image.public_id);
                    } catch (err) {
                        console.error(
                            `Failed to delete ${image.public_id}`,
                            err
                        );
                    }
                }
            }

            // Save new images
            updatedData.imagespath = req.files.map(file => ({
                url: file.path,
                public_id: file.filename
            }));
        }
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        ).populate("category");

        res.json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


//deleteProduct
export const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Delete all images from Cloudinary
        for (const image of product.imagespath) {
            if (image.public_id) {
                try {
                    await cloudinary.uploader.destroy(image.public_id);
                } catch (err) {
                    console.error(
                        `Failed to delete ${image.public_id}`,
                        err
                    );
                }
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};