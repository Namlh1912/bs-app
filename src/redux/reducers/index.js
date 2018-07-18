import { combineReducers } from 'redux';
import books from './book';
import carts from './cart';

const rootReducer = combineReducers({
  books,
  carts,
});

export default rootReducer;