var express = require('express'),
  get = require('../api/get'),
  movieRoutes = express.Router();

movieRoutes.get('/movie/*', get);
movieRoutes.get('/genre/*', get);
movieRoutes.get('/search/*', get);

module.exports = movieRoutes;
