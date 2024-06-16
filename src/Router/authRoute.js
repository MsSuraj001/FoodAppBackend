const express = require('express');
const logIn = require('../Controller/authController');

const authRouter = express.Router();


authRouter.post('/login', logIn);


module.exports = authRouter;