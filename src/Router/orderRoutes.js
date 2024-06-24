
const express = require('express');
const { isLoggedIn } = require('../Validations/authValidator');
const { createNewOrder } = require('../Controller/orderController');

const orderRouter = express.Router();

orderRouter.post('/',isLoggedIn, createNewOrder);


module.exports = orderRouter;
