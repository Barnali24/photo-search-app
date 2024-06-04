import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; 
import usersReducer from './reducers'; 

const store = createStore(
  usersReducer,
  applyMiddleware(thunk)
);

export default store;
