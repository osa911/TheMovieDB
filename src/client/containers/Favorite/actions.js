import * as types from './constants';
// import { createParams } from '../../helpers/createParams';
import { GENRES_SCHEMA } from './schema';

export const loadAllFavoritesMovie = (userID, token) => ({
  types:   [
    types.LOAD_ALL_FAVORITES_MOVIE_REQUEST,
    types.LOAD_ALL_FAVORITES_MOVIE_SUCCESS,
    types.LOAD_ALL_FAVORITES_MOVIE_FAILURE
  ],
  promise: api => api.get(`/api/getAllFavoritesByUserId?userID=${userID}&token=${token}`)
});

export const deleteFavoritesMovie = ({ userID, movieID }, token) => ({
  types:   [
    types.DEL_FAVORITES_MOVIE_REQUEST,
    types.DEL_FAVORITES_MOVIE_SUCCESS,
    types.DEL_FAVORITES_MOVIE_FAILURE
  ],
  promise: api => api.delete(`/api/deleteFavoriteByUserId?userID=${userID}&movieID=${movieID}&token=${token}`),
  movieID
});

export const loadGenres = () => ({
  types: [
    types.LOAD_GENRES_REQUEST,
    types.LOAD_GENRES_SUCCESS,
    types.LOAD_GENRES_FAILURE
  ],
  promise: api => api.get(`/movieApi/genre/movie/list`),
  schema: GENRES_SCHEMA,
});

export const loadMovie = id => ({
  types: [
    types.LOAD_MOVIE_REQUEST,
    types.LOAD_MOVIE_SUCCESS,
    types.LOAD_MOVIE_FAILURE
  ],
  promise: api => api.get(`/movieApi/movie/${id}`)
});