import { combineReducers } from 'redux';

// Reducers

import cartReducer from './cartReducer';
import productsReducer from './productsReducer';
import userReducer from './userReducer';
import { reducer as form } from 'redux-form';

// Combine Reducers
export default combineReducers({
  cart: cartReducer,
  products: productsReducer,
  user: userReducer,
  // Key has to be form to make redux-form work.
  form
});
