const express = require('express');

const cartRouter = express.Router();

cartRouter.post('/', ()=>{
    console.log("this is the cart Routers");
});


module.exports = cartRouter;