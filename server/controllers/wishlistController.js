import Wishlist from "../models/wishlist.js";
import Product from "../models/products.js";

export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.userID;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({
                user: userId,
                items: [
                    {
                        product: productId,
                    },
                ],
            });
        } else {
            const exists = wishlist.items.some(
                item => item.product.toString() === productId
            );

            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: "Product already in wishlist",
                });
            }

            wishlist.items.push({
                product: productId,
            });
        }

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Item added to Wishlist",
            wishlist,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding item to Wishlist",
            error: error.message,
        });
    }
};


// GET USER Wishlist    
export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.userID;

        const wishlist = await Wishlist.findOne({ user: userId })
            .populate({
                path: "items.product",
                populate: {
                    path: "category"
                }
            });

        if (!wishlist) {
            return res.status(200).json({
                success: true,
                wishlist: { items: [] },
            });
        }

        const originalLength = wishlist.items.length;

        wishlist.items = wishlist.items.filter(item => item.product);

        if (wishlist.items.length !== originalLength) {
            await wishlist.save();
        }

        res.json({
            success: true,
            wishlist,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// REMOVE ITEM FROM Wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.userID;
        const { productId } = req.body;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.items = wishlist.items.filter((item) =>
            !(
                item.product.toString() === productId

            )
        );

        await wishlist.save();

        res.json({
            success: true,
            message: "Item removed",
            wishlist,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// CLEAR Wishlist
export const clearWishlist = async (req, res) => {
    try {
        const userId = req.user.userID;

        await Wishlist.findOneAndDelete({ user: userId });

        res.json({
            success: true,
            message: "Wishlist cleared"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//getWishlistCount
export const getWishlistCount = async (req, res) => {
    try {
        const userId = req.user.userID;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(200).json({ count: 0 });
        }

        const count = wishlist.items.length;

        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: "Error getting Wishlist count" });
    }
};