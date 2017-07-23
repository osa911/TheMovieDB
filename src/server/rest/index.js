var localApi = require('./localApi');
var authApi = require('./authApi');
var otherApi = require('./otherApi');
var movieApi = require('./movieApi');

module.exports = {
  authApi: authApi,
  localApi: localApi,
  otherApi: otherApi,
  movieApi: movieApi,
}