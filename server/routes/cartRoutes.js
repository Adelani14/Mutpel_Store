import express from "express";
import isAuth from "../middleware/isAuth.js";
import { addToCart, removeFromCart, getCart, clearCart, updateCartItem, getCartCount } from "../controllers/cartController.js";

const router = express.Router();

router.post("/addToCart", isAuth, addToCart);
router.get("/getCart", isAuth, getCart);
router.get("/getCartCount", isAuth, getCartCount);
router.delete("/removeFromCart", isAuth, removeFromCart);
router.put("/updateCartItem", isAuth, updateCartItem);
router.delete("/clearCart", isAuth, clearCart);


export default router;

