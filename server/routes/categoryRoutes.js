import Category from "../models/category.js";



// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { name, slug, image, description } = req.body;

    const categoryExists = await Category.findOne({ slug });

    if (categoryExists) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      slug,
      image,
      description,
    });

    res.status(201).json(category);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {

    const categories = await Category.find();

    res.json(categories);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};