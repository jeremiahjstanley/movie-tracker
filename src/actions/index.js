export const addMovies = (movies) => ({
  type: 'ADD_MOVIES',
  movies
});

export const addFavorite = (movie) => ({
  type: 'ADD_FAVORITE',
  movie
});

export const updateFavorites = (favorites) => ({
  type: 'UPDATE_FAVORITES',
  favorites
});

export const signUp = (userName, email, id) => ({
  type: 'SIGN_UP',
  userName,
  email, 
  id
});

export const logIn = (email, name, id) => ({
  type: 'LOG_IN',
  email,
  name,
  id
});

export const logOut = () => ({
  type: 'LOG_OUT',
  email: '',
  name: ''
});

