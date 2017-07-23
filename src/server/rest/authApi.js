var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config/database'); 
var User = require('../app/models/user');
var MAR = require('../helpers/makeAresponce');

var apiRoutes = express.Router();


apiRoutes.post('/register', function (req, res) {
  User.findOne({
    name: req.body.name
  }, function (err, user) {

    if (err) throw err;
    
    if (user) {
      res.json({
        success: false,
        message: 'Registration failed. User was found.'
      });
    } else if (!user) {

     var newUser = new User({
       name: req.body.name,
       password: req.body.password,
       admin: req.body.isAdmin
     });

     newUser.save(function (err) {
       if (err) throw err;
       res.json({
         success: true,
         message: 'User saved successfully',
       });
     });

    }

  });
});

apiRoutes.post('/login', function (req, res) {
  User.findOne({
    name: req.body.name
  }, function (err, user) {

    if (err) throw err;

    if (!user) {
      res.status(403).send(MAR(false, res.statusCode, 'Authentication failed. User not found.'));
    } else if (user) {
      if (user.password != req.body.password) {
        res.status(403).send(MAR(false, res.statusCode, 'Authentication failed. Wrong password.'));
      } else {
        var expires = 1440; // expires in 24 hours
        var token = jwt.sign(user, config.secret, {
          expiresIn: expires + 'm'
        });
        res.json(MAR(true, res.statusCode, 'Logging is successfully', {
          user: user,
          expires: expires,
          token: token
        }));
      }
    }
  });
});

apiRoutes.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json(MAR(false, res.statusCode, 'Failed to authenticate token.'));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send(MAR(false, res.statusCode, 'No token provided.'));
  }
});

module.exports = apiRoutes;