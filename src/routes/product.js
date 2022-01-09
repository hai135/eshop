const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProduct,
    deleteAllProduct,
    updateGallery,
    upload,
} = require('./../controllers/productController');

router.post('/', upload.single('image'), createProduct);
router.get('/', getProduct);
router.put('/gallery/:id', upload.array('images', 10), updateGallery);
router.delete('/', deleteAllProduct);
module.exports = router;
