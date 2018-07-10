import { combineReducers } from 'redux';
import { moviesReducer } from './moviesReducer';
import { favoritesReducer } from './favoritesReducer';
import { usersReducer } from './usersReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer,
  users: usersReducer
});


export default rootReducer;