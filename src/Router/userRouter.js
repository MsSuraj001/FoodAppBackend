const express = require('express');
const { createUser } = require('../Controller/userController');


const routes = express.Router();


routes.post('/', createUser);
// routes.get('/', )


module.exports = routes;