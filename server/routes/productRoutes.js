import express from "express";
import upload from "../middleware/multer.js";
import isAuth from "../middleware/isAuth.js";

import { createProduct, getProducts, getProductById, deleteProduct, searchProducts , updateProduct, getSingleProduct, getRelatedProducts, getProductsByCategory } from "../controllers/productController.js";


const router = express.Router();

router.post(
    "/createNewProduct",
    isAuth,
    upload.array("images", 8),
    createProduct
);
router.put(
    "/:id",
    isAuth,
    upload.array("images", 8),
    updateProduct
); router.delete("/:id", isAuth, deleteProduct);

router.get("/getSingleProduct/:id", isAuth, getSingleProduct);

router.get(
    "/relatedproducts/:categoryId/:productId",
    isAuth,
    getRelatedProducts
);

router.get(
    "/category/:categoryId",
    isAuth,
    getProductsByCategory
);

router.get("/search", searchProducts )

router.get("/", isAuth, getProducts);
router.get("/:id", isAuth, getProductById);

export default router;