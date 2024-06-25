
const express = require('express');
const { isLoggedIn, isAdmin } = require('../Validations/authValidator');
const { createNewOrder, getAllOrdersByUsers, getOrder, cancleOrder, changeOrderStatus } = require('../Controller/orderController');

const orderRouter = express.Router();

orderRouter.post('/',isLoggedIn, createNewOrder);
orderRouter.get('/',isLoggedIn, getAllOrdersByUsers);
orderRouter.get('/:orderId',isLoggedIn, getOrder);
orderRouter.put('/:orderId/cancle',isLoggedIn, cancleOrder);
orderRouter.put('/:orderId/status',isLoggedIn, isAdmin, changeOrderStatus);


module.exports = orderRouter;
