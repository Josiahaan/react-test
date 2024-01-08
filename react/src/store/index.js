import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducers/index';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;