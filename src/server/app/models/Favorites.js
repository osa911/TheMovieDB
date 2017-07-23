var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Favorites', new Schema({
  userID: String,
  movieID: Number
}));