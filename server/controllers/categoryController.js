import Category from "../models/category.js";





export const createCategory = async (req, res) => {

    try {

        console.log(req.body);
        console.log(req.file);

        const slug = req.body.title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");

        const categoryExists = await Category.findOne({ slug });

        if (categoryExists) {
            return res.status(400).json({
                message: "Category already exists"
            });
        }

        const category = await Category.create({
            title: req.body.title,
            slug,
            description: req.body.description,
            featured: req.body.featured,
            priority: req.body.priority,
            image: req.file?.path
        });

        res.status(201).json(category);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
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

// GET CATEGORY BY ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
    try {
        const { title, slug, imagespath, description, featured } = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id, { title, slug, imagespath, description, featured }, { new: true });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET FEATURED CATEGORIES
export const getFeaturedCategories = async (req, res) => {
    try {

        const categories = await Category.find({
            featured: true
        });

        res.json(categories);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

