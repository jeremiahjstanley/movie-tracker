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

export const logIn = (email, name) => ({
  type: 'LOG_IN',
  email,
  name
});

export const logOut = () => ({
  type: 'LOG_OUT',
  email: '',
  name: ''
});

