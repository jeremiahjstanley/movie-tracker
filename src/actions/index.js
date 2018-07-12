export const addMovies = (movies) => ({
  type: 'ADD_MOVIES',
  movies
});

export const toggleFavorite = (id) => ({
  type: 'TOGGLE_FAVORITE',
  id
});

export const signUp = (userName, password, email) => ({
  type: 'SIGN_UP',
  userName,
  password, 
  email
});

export const logIn = (userName, password) => ({
  type: 'LOG_IN',
  userName,
  password
});

export const logOut = (userName) => ({
  type: 'LOG_OUT',
  userName
});

