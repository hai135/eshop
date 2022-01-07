const Product = require('./../models/product');
const Category = require('./../models/category');
const createProduct = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(400).json({ message: 'Invalid category' });
        }
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).send({
            error: err.message,
            success: false,
        });
    }
};

const getProduct = async (req, res) => {
    const filter = {};
    if (req.query.category) {
        filter.category = req.query.category.split(',');
    }
    try {
        const productList = await Product.find(filter);
        res.status(200).json(productList);
    } catch (err) {
        res.status(500).send({
            error: err.message,
            success: false,
        });
    }
};

const getProductFeatures = async (req, res) => {
    try {
        const productList = await Product.find({ isFeatured: true });
        res.status(200).json(productList);
    } catch (err) {
        res.status(500).send({
            error: err.message,
            success: false,
        });
    }
};

const deleteAllProduct = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.status(200).json({ message: 'Delete all product' });
    } catch (err) {
        res.status(500).send({
            error: err.message,
            success: false,
        });
    }
};
module.exports = {
    createProduct,
    getProduct,
    deleteAllProduct,
    getProductFeatures,
};
