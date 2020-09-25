const { Router } = require('express');
const HomeController = require('./app/controllers/HomeController');

const routes = new Router();

routes.get('/', HomeController.index);

module.exports = routes;