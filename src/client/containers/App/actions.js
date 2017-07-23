import * as types from './constants';

export const toggleModal = status => ({
  type: types.TOGGLE_MODAL,
  status,
});

export const postLogin = data => ({
  types: [
    types.LOGIN_REQUEST,
    types.LOGIN_SUCCESS,
    types.LOGIN_FAILURE
  ],
  promise: api => api.post('/api/login', data),
});

export const changeParam = (key, value) => ({
  type: types.CHANGE_PARAM,
  key,
  value,
});
