import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './rootReducer';
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});
const store = createStore(reducers(), composeEnhancers(
  applyMiddleware(thunk, loggerMiddleware)
));

export default store;
