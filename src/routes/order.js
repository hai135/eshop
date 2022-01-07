const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrderDetail,
    updateStatusOrder,
    deleteOrder,
    statistics,
} = require('./../controllers/orderController');
router.put('/:id', updateStatusOrder);
router.delete('/:id', deleteOrder);
router.get('/statistics', statistics);
router.post('/', createOrder);
router.get('/', getOrderDetail);
module.exports = router;
