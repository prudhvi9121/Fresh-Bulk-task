const OrderModel = require('../models/orderModel');

const createOrder = (req, res) => {
    const { buyer_name, address, product_id, product_name, quantity } = req.body;

    if (!buyer_name || !address || !product_id || !quantity) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const orderData = { buyer_name, address, product_id, product_name, quantity };

    OrderModel.create(orderData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Order placed successfully',
            ...result
        });
    });
};

const getOrderById = (req, res) => {
    OrderModel.findById(req.params.id, (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(row);
    });
};

const getAllOrders = (req, res) => {
    OrderModel.getAll((err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

const updateOrderStatus = (req, res) => {
    const { status } = req.body;
    OrderModel.updateStatus(req.params.id, status, (err, changes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (changes === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order status updated', status });
    });
};

module.exports = {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrderStatus
};
