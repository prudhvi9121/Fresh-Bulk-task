const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/orders', orderController.getAllOrders);
router.put('/orders/:id', orderController.updateOrderStatus);

module.exports = router;
