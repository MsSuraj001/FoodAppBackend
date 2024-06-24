const express = require('express');
const { getCartByUser, modifyProductToCart, clearCartById } = require('../Controller/cartController');
const { isLoggedIn } = require('../Validations/authValidator');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, getCartByUser);

cartRouter.post('/:operation/:productId', isLoggedIn, modifyProductToCart);

cartRouter.delete('/products', isLoggedIn, clearCartById);


module.exports = cartRouter;