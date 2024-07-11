const express = require('express');
const { addProduct, getProduct, deleteProduct, getProducts } = require('../Controller/productController');
const uploader = require('../Middleware/multerMiddleware');
const { isAdmin, isLoggedIn } = require('../Validations/authValidator');


const productRouter = express.Router();

productRouter.post(
    '/',
    isLoggedIn,
    isAdmin,
    uploader.single('productImage'),
    addProduct
);

productRouter.get('/:id', getProduct);
productRouter.get('/', getProducts);
productRouter.delete('/:id', deleteProduct);

module.exports = productRouter;