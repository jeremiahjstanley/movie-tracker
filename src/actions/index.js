export const addMovies = (movies) => ({
  type: 'ADD_MOVIES',
  movies
});

export const toggleFavorite = (id) => ({
  type: 'TOGGLE_FAVORITE',
  id
});

export const signUp = (username, password, email) => ({
  type: 'SIGN_UP',
  username,
  password, 
  email
});

export const logIn = (username, password) => ({
  type: 'LOG_IN',
  username,
  password
});

export const logOut = (username) => ({
  type: 'LOG_OUT',
  username
});

