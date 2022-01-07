const Category = require('./../models/category');
const Product = require('./../models/product');
const getListCategory = async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).json(categoryList);
    } catch (err) {
        res.status(500).json({
            error: err.message,
            success: false,
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({
            error: err.message,
            success: false,
        });
    }
};

const createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
};

const deleteCategoryById = async (req, res) => {
    try {
        await Category.findByIdAndRemove(req.params.id);
        await Product.deleteMany({ category: req.params.id });
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
};

const updateCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({
            error: err.message,
            success: false,
        });
    }
};
module.exports = {
    getListCategory,
    createCategory,
    getCategoryById,
    deleteCategoryById,
    updateCategoryById,
};
