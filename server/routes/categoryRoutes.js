import express from "express";
import upload from "../middleware/multer.js";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory, getFeaturedCategories } from "../controllers/categoryController.js";


const router = express.Router();

router.post(
    "/createCategory",
    upload.single("imagespath"),
    createCategory
);
router.put(
    "/update/:id",
    upload.single("imagespath"),
    updateCategory
); router.delete("/delete/:id", deleteCategory);
router.get("/", getCategories);
router.get("/getCategoryById/:id", getCategoryById);
router.get("/featured", getFeaturedCategories);

export default router;
