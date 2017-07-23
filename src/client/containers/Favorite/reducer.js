import { combineReducers } from 'redux';
import * as types from './constants';
import _omit from 'lodash/omit';

const initialState = {
  isLoad: false,
  favorites: [],
  movies: {},
  entities: {
    genres: {},
  },
};


const entities = (state = initialState.entities, action) => {
  switch (action.type) {
    case types.LOAD_GENRES_FAILURE:
      return state;
    case types.LOAD_GENRES_SUCCESS:
      return {
        ...state,
        ...action.entities
      };
    default:
      return state;
  }
};

const movies = (state = initialState.movies, action) => {
  switch (action.type) {
    // ...........................................................................
    case types.LOAD_MOVIE_FAILURE:
      return state;
    case types.DEL_FAVORITES_MOVIE_SUCCESS:
      return _omit(state, action.movieID);
    case types.LOAD_MOVIE_SUCCESS:
      return {
        ...state,
        [action.data.id]: action.data
      };
    default:
      return state;
  }
};

const favorites = (state = initialState.favorites, action) => {
  switch (action.type) {
    // ...........................................................................
    case types.LOAD_ALL_FAVORITES_MOVIE_SUCCESS:
      return action.data.favorites;
    default:
      return state;
  }
};

const isLoad = (state = initialState.isLoad, action) => {
  switch (action.type) {
    // ...........................................................................
    case types.LOAD_ALL_FAVORITES_MOVIE_REQUEST:
    case types.LOAD_GENRES_REQUEST:
      return true;
    // ...........................................................................
    case types.LOAD_ALL_FAVORITES_MOVIE_SUCCESS:
    case types.LOAD_ALL_FAVORITES_MOVIE_FAILURE:
    case types.LOAD_GENRES_SUCCESS:
    case types.LOAD_MOVIE_FAILURE:
      return false;
    // ...........................................................................
    default:
      return state;
  }
};

export default combineReducers({
  isLoad,
  favorites,
  movies,
  entities,
});
