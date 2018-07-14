export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.movie];
    case 'UPDATE_FAVORITES':
      return action.favorites;
    case 'GET_SAVED_FAVORITES':
      return action.favorites;
    default:
      return state;
  }
};