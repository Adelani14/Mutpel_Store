import express from "express";
import upload from "../middleware/multer.js";
import isAuth from "../middleware/isAuth.js";
import isAdmin from "../middleware/isAdmin.js";

import { createProduct, getProducts, getNewArrivals, getFeaturedProducts, getTopDeals, getProductById, deleteProduct, searchProducts, updateProduct, getSingleProduct, getRelatedProducts, getProductsByCategory } from "../controllers/productController.js";


const router = express.Router();

router.post(
    "/createNewProduct",
    isAuth,
    isAdmin,
    upload.array("images", 8),
    createProduct
);
router.put(
    "/:id",
    isAuth,
    isAdmin,
    upload.array("images", 8),
    updateProduct
);

router.delete("/:id", isAuth, isAdmin, deleteProduct);

router.get("/getSingleProduct/:id", getSingleProduct);

router.get(
    "/relatedproducts/:categoryId/:productId",
    getRelatedProducts
);

router.get(
    "/category/:categoryId",
    getProductsByCategory
);

router.get("/search", searchProducts)

router.get("/", getProducts);
router.get("/top-deals", getTopDeals);
router.get("/featured", getFeaturedProducts);
router.get("/new-arrivals", getNewArrivals);
router.get("/:id", getProductById);

export default router;