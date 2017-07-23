import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  app,
  nowPlaying,
  popular,
  favorites,
  notFound
} from './containers';

export default (
  <Route path='/' component={app}>
    <IndexRoute component={nowPlaying} />
    <Route path='/popular' component={popular} />
    <Route path='/favorites' component={favorites} />
    <Route path='*' component={notFound} />
  </Route>
);
