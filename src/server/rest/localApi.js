var express = require('express');
var Favorites = require('../app/models/Favorites');
var MAR = require('../helpers/makeAresponce');
var LocalApi = express.Router();

LocalApi.get('/getAllFavoritesByUserId', function (req, res) {
  Favorites.find({
    userID: req.query.userID
  }, function (err, result) {

    if (err) throw err;

    if (result) {
      res.json({
        success: true,
        message: 'That`s all',
        favorites: result
      });
    } else if (!result) {
      res.json({
        success: false,
        message: 'Not found.'
      });
    }
  });
});

LocalApi.delete('/deleteFavoriteByUserId', function (req, res) {
  Favorites.remove({
    userID: req.query.userID,
    movieID: req.query.movieID,
  }, function (err, result) {

    if (err) throw err;
    
    if (result) {
      res.json({
        success: true,
        message: 'Deleted'
      });
    } else if (!result) {
      res.json({
        success: false,
        message: 'Not found.'
      });
    }
  });
})

LocalApi.post('/addToFavorites', function (req, res) {
  var addToFavorites = new Favorites({
    userID: req.body.userID,
    movieID: req.body.movieID,
  });

  addToFavorites.save(function (err) {
    if (err) throw err;
    res.json(MAR(true, res.statusCode, 'Movie added successfully.'));
  });
});

module.exports = LocalApi;
