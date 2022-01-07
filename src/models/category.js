const mongoose = require('mongoose');
const Product = require('./product');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    },
    icon: {
        type: String,
    },
    image: {
        type: String,
    },
});

categorySchema.virtual('thisProduct', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category',
});

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});

categorySchema.pre('remove', async (req, res, next) => {
    // await Product.deleteMany({ category: c._id });
    console.log('pre remove');
    console.log(this._id);
    next();
});

module.exports = mongoose.model('Category', categorySchema);
