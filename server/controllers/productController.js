import Product from "../models/products.js";




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

        const slug = title
            ? `${title.toLowerCase().trim().replace(/\s+/g, "-")}-${Date.now()}`
            : "";

        // Cloudinary image URL
        const imagespath = req.files
            ? req.files.map(file => file.path)
            : [];


        const product = new Product({
            title,
            slug,
            price,
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
    try {
        const products = await Product.find().populate("category");
        res.json(products);
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

        // if new image uploaded
        if (req.files && req.files.length > 0) {
            updatedData.imagespath = req.files.map(file => file.path);
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        ).populate("category");

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

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
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};