import { Schema, arrayOf } from 'normalizr';

const genres = new Schema('genres');

export const GENRES_SCHEMA = { genres: arrayOf(genres) };
