const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategoryById,
    getListCategory,
    deleteCategoryById,
    updateCategoryById,
} = require('./../controllers/categoryController');
router.get('/:id', getCategoryById);
router.delete('/:id', deleteCategoryById);
router.put('/:id', updateCategoryById);
router.get('/', getListCategory);
router.post('/', createCategory);
module.exports = router;
