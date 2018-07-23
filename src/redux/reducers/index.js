import { combineReducers } from 'redux';
import books from './book';
import carts from './cart';
import users from './user';
import auth from './auth';

const rootReducer = combineReducers({
  books,
  carts,
  users,
  auth
});

export default rootReducer;