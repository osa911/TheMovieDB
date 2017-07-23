import express from 'express';
import React from 'React';
import ReactDOM from 'react-dom/server';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

import config from './config/database';
import restService from './rest';
import Html from './helpers/Html';

const port = process.env.PORT || 3030;
const app = express();
mongoose.connect(config.database); // connect to database

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// API ROUTES -------------------
app.use('/movieApi', restService.movieApi);
app.use('/api', restService.otherApi);
app.use('/api', restService.authApi);
app.use('/api', restService.localApi);

// basic route
app.get('/*', (req, res) => {
  res.send(`<!doctype html>\n${ReactDOM.renderToString(<Html />)}`);
});

app.listen(port);
console.log('-------> Application work at http://localhost:' + port);