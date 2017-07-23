import { combineReducers } from 'redux';

import App from './containers/App/reducer';
import NowPlaying from './containers/NowPlaying/reducer';
import Popular from './containers/Popular/reducer';
import Favorite from './containers/Favorite/reducer';

const rootReducer = combineReducers({
  App,
  NowPlaying,
  Popular,
  Favorite
});

export default rootReducer;
