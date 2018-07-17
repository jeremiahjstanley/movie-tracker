export const fetchMovieData = jest.fn();

export const deleteFavoriteFromDatabase = jest.fn();

export const getFavoritesFromDatabase = jest.fn().mockImplementation(() => ({
  data: [{title: 'Con Air'}, {title: 'Face/Off'}, {title: 'Captain Ron'}]
}))
