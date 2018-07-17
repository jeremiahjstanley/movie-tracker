export const fetchMovieData = jest.fn();

export const deleteFavoriteFromDatabase = jest.fn();

export const getFavoritesFromDatabase = jest.fn().mockImplementation(() => ({
  data: [{title: 'Con Air'}, {title: 'Face/Off'}, {title: 'Captain Ron'}]
}))

export const createUser = jest.fn().mockImplementation(() => ({
  id: 2
}));

export const sendFavoriteToDatabase = jest.fn()
