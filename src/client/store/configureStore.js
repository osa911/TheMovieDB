import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import apiMiddleware from './apiMiddleware';
import rootReducer from '../reducers';

const logger = createLogger();

export default function configureStore(api, initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      apiMiddleware(api),
      thunk,
      logger
    )
  );

  return store;
}
