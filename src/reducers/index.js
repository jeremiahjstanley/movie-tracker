import { combineReducers } from 'redux';
import { moviesReducer } from './moviesReducer';
import { loginReducer } from './loginReducer';
// import { usersReducer } from './usersReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  login: loginReducer
});


export default rootReducer;