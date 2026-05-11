import express from "express";
import {createProduct, getProducts, getProductById, deleteProduct, updateProduct} from "../controllers/productController.js";
import e from "express";

const router = express.Router();

router.post("/createNewProduct", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;