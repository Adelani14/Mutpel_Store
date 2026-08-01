import express from "express";
import upload from "../middleware/multer.js";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory, getFeaturedCategories } from "../controllers/categoryController.js";


const router = express.Router();

// router.post("/createCategory", createCategory);
router.post(
    "/createCategory",
    upload.single("imagespath"),
    createCategory
);
router.get("/", getCategories);
router.get("/getCategoryById", getCategoryById);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/featured", getFeaturedCategories);

export default router;
