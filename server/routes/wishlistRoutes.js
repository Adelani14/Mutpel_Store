import express from "express";
import isAuth from "../middleware/isAuth.js";
import { addToWishlist, removeFromWishlist, getWishlist, clearWishlist,  getWishlistCount } from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/addToWishlist", isAuth, addToWishlist);
router.get("/getWishlist", isAuth, getWishlist);
router.get("/getWishlistCount", isAuth, getWishlistCount);
router.delete("/removeFromWishlist", isAuth, removeFromWishlist);
router.delete("/clearWishlist", isAuth, clearWishlist);


export default router;

