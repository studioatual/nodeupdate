const { Router } = require('express');
const HomeController = require('./app/controllers/HomeController');

const routes = new Router();

routes.get('/api', HomeController.index);
routes.get('/', HomeController.show);

module.exports = routes;