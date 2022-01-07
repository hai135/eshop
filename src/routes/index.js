const Product = require('./product');
const Category = require('./category');
const User = require('./user');
const Order = require('./order');
module.exports = (app) => {
    app.use('/user', User);
    app.use('/product', Product);
    app.use('/category', Category);
    app.use('/order', Order);
};
