import Cart from "../models/cart.js";

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.userID;

        const {
            productId,
            quantity,
            size,
            color
        } = req.body;

        const qty = Number(quantity) || 1;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [
                    {
                        product: productId,
                        quantity: qty,
                        size,
                        color
                    }
                ]
            });
        } else {
            const itemIndex = cart.items.findIndex((item) =>
                item.product.toString() === productId &&
                item.size === size &&
                item.color === color
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += qty;
            } else {
                cart.items.push({
                    product: productId,
                    quantity: qty,
                    size,
                    color
                });
            }
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding item to cart",
            error: error.message
        });
    }
};


// GET USER CART    
export const getCart = async (req, res) => {
    try {
        const userId = req.user.userID;

        const cart = await Cart.findOne({ user: userId })
            .populate({
                path: "items.product",
                populate: {
                    path: "category"
                }
            });

        res.json({
            success: true,
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// REMOVE ITEM FROM CART
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.userID;
        const { productId, size, color } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter((item) =>
            !(
                item.product.toString() === productId &&
                item.size === size &&
                item.color === color
            )
        );

        await cart.save();

        res.json({
            success: true,
            message: "Item removed",
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE ITEM QUANTITY
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.userID;
        const { productId, quantity, size, color } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find((item) =>
            item.product.toString() === productId &&
            item.size === size &&
            item.color === color
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        item.quantity = Number(quantity);

        await cart.save();

        res.json({
            success: true,
            message: "Cart updated",
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// CLEAR CART
export const clearCart = async (req, res) => {
    try {
        const userId = req.user.userID;

        await Cart.findOneAndDelete({ user: userId });

        res.json({
            success: true,
            message: "Cart cleared"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//getCartCount
export const getCartCount = async (req, res) => {
    try {
        const userId = req.user.userID;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(200).json({ count: 0 });
        }

        const count = cart.items.length;

        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: "Error getting cart count" });
    }
};