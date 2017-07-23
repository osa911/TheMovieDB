import { Schema, arrayOf } from 'normalizr';

const genres = new Schema('genres');
const favorites = new Schema('favorites', { idAttribute: 'movieID' });

export const GENRES_SCHEMA = { genres: arrayOf(genres) };
export const FAVORITE_SCHEMA = { favorites: arrayOf(favorites) };
