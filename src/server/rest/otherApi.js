var express = require('express');
var User = require('../app/models/user');
var otherApi = express.Router();

otherApi.get('/', function (req, res) {
  res.json({
    statusCode: res.statusCode,
    message: 'Welcome to the API!',
  });
});

otherApi.get('/getAllUsers', function (req, res) {
  User.find({}, function (err, users) {
    res.json(users);
  });
});

module.exports = otherApi;
