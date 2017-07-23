import { combineReducers } from 'redux';
import _omit from 'lodash/omit';
import * as types from './constants';
import { setFiltersValue } from '../../helpers/setObjValue';

const initialState = {
  isLoad: false,
  movies: [],
  entities: {
    genres: {},
    favorites: {}
  },
  filters: {
    page: 1,
    language: 'en-US', // можно будет потом написать смену локализации
    query: ''
  }
};

const movies = (state = initialState.movies, action) => {
  switch (action.type) {
    case types.LOAD_NOW_PLAYING_MOVIE_FAILURE:
    case types.SEARCH_MOVIE_FAILURE:
      return [];
    case types.LOAD_NOW_PLAYING_MOVIE_SUCCESS:
    case types.SEARCH_MOVIE_SUCCESS:
      return action.data.results;
    default:
      return state;
  }
};

const entities = (state = initialState.entities, action) => {
  switch (action.type) {
    case types.LOAD_GENRES_FAILURE:
    case types.LOAD_ALL_FAVORITES_MOVIE_FAILURE:
      return state;
    case types.LOAD_GENRES_SUCCESS:
    case types.LOAD_ALL_FAVORITES_MOVIE_SUCCESS:
      return {
        ...state,
        ...action.entities
      };
    case types.DEL_FAVORITES_MOVIE_SUCCESS:
      return {
        ...state,
        favorites: _omit(state.favorites, action.movieID)
      };
    case types.ADD_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [action.movie.movieID]: 'added'
        }
      }
    default:
      return state;
  }
};

const paging = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_NOW_PLAYING_MOVIE_SUCCESS:
    case types.SEARCH_MOVIE_SUCCESS:
      return {
        page: action.data.page,
        totalPages: action.data.total_pages
      };
    case types.LOAD_NOW_PLAYING_MOVIE_FAILURE:
    case types.SEARCH_MOVIE_FAILURE:
      return null;
    default:
      return state;
  }
};

const filters = (state = initialState.filters, action) => {
  switch (action.type) {
    case types.SET_FILTER:
      return {
        ...state,
        ...setFiltersValue(state, action.key, action.value),
      };
    default:
      return state;
  }
};

const isLoad = (state = initialState.isLoad, action) => {
  switch (action.type) {
    // ...........................................................................
    case types.LOAD_NOW_PLAYING_MOVIE_REQUEST:
    case types.SEARCH_MOVIE_REQUEST:
      return true;
    // ...........................................................................
    case types.LOAD_NOW_PLAYING_MOVIE_SUCCESS:
    case types.LOAD_NOW_PLAYING_MOVIE_FAILURE:
    case types.SEARCH_MOVIE_SUCCESS:
    case types.SEARCH_MOVIE_FAILURE:
      return false;
    // ...........................................................................
    default:
      return state;
  }
};

const isFiltersDebounce = (state = false, action) => {
  switch (action.type) {
    case types.SET_FILTER:
      return action.isFiltersDebounce;
    default:
      return state;
  }
};

export default combineReducers({
  isLoad,
  movies,
  filters,
  paging,
  entities,
  isFiltersDebounce
});
