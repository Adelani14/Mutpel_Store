import express from "express";
import upload from "../middleware/multer.js";
import isAuth from "../middleware/isAuth.js";

import { createProduct, getProducts, getProductById, deleteProduct, updateProduct } from "../controllers/productController.js";

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

router.get("/", isAuth, getProducts);
router.get("/:id", isAuth, getProductById);

export default router;