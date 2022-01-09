const Product = require('./../models/product');
const Category = require('./../models/category');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let isValid = null;
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            isValid = new Error('Please upload an image');
        }
        cb(isValid, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname
            .replace(' ', '_')
            .replace(/(.\w{3,4}$)/, Date.now() + '$1');
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

const createProduct = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(400).json({ message: 'Invalid category' });
        }
        const file = req.file;
        if (!file) return res.status(400).send('No image in the request');
        const fileName = file.filename;
        const path = `${req.protocol}://${req.get('host')}/public/uploads/`;
        const newProduct = new Product({
            ...req.body,
            image: `${path}${fileName}`,
        });
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

const updateGallery = async (req, res) => {
    try {
        const files = req.files;
        const fileUrl = [];
        if (files) {
            const path = `${req.protocol}://${req.get('host')}/public/uploads/`;
            files.map((file) => {
                fileUrl.push(path + file.filename);
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: fileUrl,
            },
            { new: true }
        );
        res.status(201).json(product);
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
    updateGallery,
    upload,
};
