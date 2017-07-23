import { createStructuredSelector } from 'reselect';

const REDUCER = 'Favorite';
const APP = 'App';

const isLoad = state => state[REDUCER].isLoad;
const favorites = state => state[REDUCER].favorites;
const movies = state => state[REDUCER].movies;
const entities = state => state[REDUCER].entities;
// const paging = state => state[REDUCER].paging;
// const filters = state => state[REDUCER].filters;
// const isFiltersDebounce = state => state[REDUCER].isFiltersDebounce;
const isLogined = state => state[APP].loginInfo.isLogined;
const token = state => state[APP].loginInfo.token;
const user = state => state[APP].loginInfo.user;

export default createStructuredSelector({
  isLogined,
  token,
  isLoad,
  user,
  favorites,
  movies,
  // filters,
  entities,
  // isFiltersDebounce
});
