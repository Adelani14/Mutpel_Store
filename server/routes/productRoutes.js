import express from "express";
import upload from "../middleware/multer.js";

import { createProduct, getProducts, getProductById, deleteProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.post(
    "/createNewProduct",
    upload.array("images", 8),
    createProduct
);
router.put(
    "/:id",
    upload.array("images", 8),
    updateProduct
); router.delete("/:id", deleteProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;