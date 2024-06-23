const express = require('express');
const { getCartByUser, modifyProductToCart } = require('../Controller/cartController');
const { isLoggedIn } = require('../Validations/authValidator');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, getCartByUser);

cartRouter.post('/:operation/:productId', isLoggedIn, modifyProductToCart);


module.exports = cartRouter;