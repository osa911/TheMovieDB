var config = require('../config/api'),
  rest = require('restler');

var get = (req, res) => {

  let apiKey = config.api_key ? `api_key=${config.api_key}` : '';

  if (apiKey) {
    apiKey = !!Object.keys(req.query).length ? '&' + apiKey : '?' + apiKey;
  }

  const queryUrl = req.originalUrl.replace('movieApi/', '');;
  // console.log('queryUrl: ', queryUrl);

  const query = `${config.api_url}${config.api_version}${queryUrl}${apiKey}`;
  // console.log('query: ', query);

  rest.get(query).on('success', function (data, response) {
    res.send(data);
  }).on('fail', function (err, response) {
    console.log(err);
    res.status(response.statusCode).send(err);
  });

};

module.exports = get;
