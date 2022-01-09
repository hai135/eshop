const Order = require('./../models/order');
const OrderItem = require('./../models/orderItem');
const Product = require('./../models/product');
const createOrder = async (req, res) => {
    const orderItemIds = Promise.all(
        req.body.orderItems.map(async (orderItem) => {
            let newOrderItem = new OrderItem({
                product: orderItem.product,
                quantity: orderItem.quantity,
            });
            await newOrderItem.save();
            return newOrderItem._id;
        })
    );
    const orderItemIdsrResolved = await orderItemIds;

    const total = (
        await Promise.all(
            orderItemIdsrResolved.map(async (orderItemId) => {
                const orderItem = await OrderItem.findById(
                    orderItemId
                ).populate('product');
                const totalPrices =
                    orderItem.quantity * orderItem.product.price;
                return totalPrices;
            })
        )
    ).reduce((t, c) => t + c, 0);
    try {
        let order = new Order({
            ...req.body,
            orderItems: orderItemIdsrResolved,
            totalPrice: total,
        });
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send({
            error: error.message,
            success: false,
        });
    }
};

const getOrderDetail = async (req, res) => {
    try {
        const order = await Order.find()
            .populate('user', 'name')
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    populate: {
                        path: 'category',
                    },
                },
            })
            .sort({ dateOrder: -1 });
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send({
            error: error.message,
            success: false,
        });
    }
};

const updateStatusOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status,
            },
            {
                new: true,
            }
        );
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({
            error: err.message,
            success: false,
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndRemove(req.params.id).populate(
            'orderItems'
        );
        if (order) {
            order.orderItems.forEach(async (item) => {
                await OrderItem.findByIdAndRemove(item._id);
            });
            res.status(200).json({
                success: true,
                message: 'The order is deleted!',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'order not found!',
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
};

const statistics = async (req, res) => {
    const statistic = (
        await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$totalPrice' },
                    totalOrder: {
                        $sum: 1,
                    },
                    // done: { $count: '$status' },
                },
            },
        ])
    ).pop();
    delete statistic._id;
    res.status(200).json({ ...statistic });
};

const getUserOrder = async (req, res) => {
    try {
        const userOrderList = await Order.find({ user: req.params.id })
            .populate('user', 'name')
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    populate: {
                        path: 'category',
                    },
                },
            })
            .sort({ dateOrder: -1 });
        res.status(200).send(userOrderList);
    } catch (error) {
        res.status(400).send({
            error: error.message,
            success: false,
        });
    }
};

module.exports = {
    createOrder,
    getOrderDetail,
    updateStatusOrder,
    deleteOrder,
    statistics,
    getUserOrder,
};
