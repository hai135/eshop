const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProduct,
    deleteAllProduct,
} = require('./../controllers/productController');

router.post('/', createProduct);
router.get('/', getProduct);
router.delete('/', deleteAllProduct);
module.exports = router;
