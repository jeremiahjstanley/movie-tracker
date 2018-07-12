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

export const logIn = (email, password) => ({
  type: 'LOG_IN',
  email,
  password
});

export const logOut = (email) => ({
  type: 'LOG_OUT',
  email
});

