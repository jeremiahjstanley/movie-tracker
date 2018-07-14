import { favoritesReducer } from '../favoritesReducer.js';
import * as actions from '../../actions';

describe('Favorites Reducter tests', () => {
  const movie = {
    id: 7,
    backdrop_path: 'nickcage.com',
    poster_path: 'nickcage.com',
    overview: 'Fear the Cage',
    vote_average: 10,
    release_date: 'the future',
    tagline: 'My daddy is coming home on July 14th, My birthday is July 14th, I am going to see my daddy for the first time ever on July 14th',
    title: 'Con Air'
  };

  it('should return the initial state', () => {
    const expected = [];
    const results = favoritesReducer(undefined, {});

    expect(results).toEqual(expected);
  });

  it('should return state with a new favorite', () => {
    const expected = [movie];
    const results = favoritesReducer(undefined, actions.addFavorite(movie));

    expect(results).toEqual(expected);
  });

  it('should update favorites', () => {
    const expected = [movie];
    const results = favoritesReducer(undefined, actions.updateFavorites([movie]));

    expect(results).toEqual(expected);
  });
});