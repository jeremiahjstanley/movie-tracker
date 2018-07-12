export const addMovies = (movies) => ({
  type: 'ADD_MOVIES',
  movies
});

export const toggleFavorite = (id) => ({
  type: 'TOGGLE_FAVORITE',
  id
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

