const express = require('express');
const {logIn, logout } = require('../Controller/authController');

const authRouter = express.Router();


authRouter.post('/login', logIn);

authRouter.post('/logout', logout);


module.exports = authRouter;