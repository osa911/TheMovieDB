import * as types from './constants';
import { createParams } from '../../helpers/createParams';
import { GENRES_SCHEMA, FAVORITE_SCHEMA } from './schema';

export const loadNowPlayingMovie = filters => ({
  types:   [
    types.LOAD_NOW_PLAYING_MOVIE_REQUEST,
    types.LOAD_NOW_PLAYING_MOVIE_SUCCESS,
    types.LOAD_NOW_PLAYING_MOVIE_FAILURE
  ],
  promise: api => api.get(`/movieApi/movie/now_playing${createParams(filters)}`)
});

export const loadGenres = () => ({
  types:   [
    types.LOAD_GENRES_REQUEST,
    types.LOAD_GENRES_SUCCESS,
    types.LOAD_GENRES_FAILURE
  ],
  promise: api => api.get(`/movieApi/genre/movie/list`),
  schema: GENRES_SCHEMA,
});

export const searchMovie = filters => ({
  types:   [
    types.SEARCH_MOVIE_REQUEST,
    types.SEARCH_MOVIE_SUCCESS,
    types.SEARCH_MOVIE_FAILURE
  ],
  promise: api => api.get(`/movieApi/search/movie${createParams(filters)}`),
});

export const addToFavorites = (movie, token) => ({
  types:   [
    types.ADD_TO_FAVORITES_REQUEST,
    types.ADD_TO_FAVORITES_SUCCESS,
    types.ADD_TO_FAVORITES_FAILURE
  ],
  promise: api => api.post(`/api/addToFavorites?token=${token}`, movie),
  movie,
});

export const loadAllFavoritesMovie = (userID, token) => ({
  types: [
    types.LOAD_ALL_FAVORITES_MOVIE_REQUEST,
    types.LOAD_ALL_FAVORITES_MOVIE_SUCCESS,
    types.LOAD_ALL_FAVORITES_MOVIE_FAILURE
  ],
  promise: api => api.get(`/api/getAllFavoritesByUserId?userID=${userID}&token=${token}`),
  schema: FAVORITE_SCHEMA,
});

export const deleteFavoritesMovie = ({ userID, movieID }, token) => ({
  types: [
    types.DEL_FAVORITES_MOVIE_REQUEST,
    types.DEL_FAVORITES_MOVIE_SUCCESS,
    types.DEL_FAVORITES_MOVIE_FAILURE
  ],
  promise: api => api.delete(`/api/deleteFavoriteByUserId?userID=${userID}&movieID=${movieID}&token=${token}`),
  movieID
});

export const setFilter = (key, value, isFiltersDebounce = false) => ({
  type: types.SET_FILTER,
  key,
  value,
  isFiltersDebounce,
});
