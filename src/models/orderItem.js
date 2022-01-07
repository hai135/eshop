const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        reuired: true,
    },
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;
