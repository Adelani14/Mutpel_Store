import express from "express";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory, getFeaturedCategories } from "../controllers/categoryController.js";


const router = express.Router();

router.post("/", createCategory);
router.get("/getCategories", getCategories);
router.get("/getCategoryById", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/featured", getFeaturedCategories);

export default router;