import { combineReducers } from 'redux';

import { moviesReducer } from './moviesReducer';
import { loginReducer } from './loginReducer';
import { favoritesReducer } from './favoritesReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer,
  login: loginReducer
});


export default rootReducer;