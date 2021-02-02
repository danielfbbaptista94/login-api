const express = require('express');


const AuthController = require('../controllers/AuthController');

const routes = express.Router();

routes.post('/auth/register', AuthController.create);
routes.post('/auth/login', AuthController.login);


module.exports = routes;