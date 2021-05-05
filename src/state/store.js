import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import * as reducers from './ducks';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  combineReducers(reducers),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
