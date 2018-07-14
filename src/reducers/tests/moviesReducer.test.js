import { moviesReducer } from '../moviesReducer.js';
import * as actions from '../../actions';

describe('Movies Reducter tests', () => {

  it('should return the initial state', () => {
    const expected = [];
    const results = moviesReducer(undefined, {});

    expect(results).toEqual(expected);
  });

  it('should return state with an array of movies', () => {
    const movies = [{
      id: 7,
      backdrop_path: 'nickcage.com',
      poster_path: 'nickcage.com',
      overview: 'Fear the Cage',
      vote_average: 10,
      release_date: 'the future',
      tagline: 'My daddy is coming home on July 14th, My birthday is July 14th, I am going to see my daddy for the first time ever on July 14th',
      title: 'Con Air'
    },
      {
        id: 9,
        backdrop_path: 'nickcage.com',
        poster_path: 'nickcage.com',
        overview: 'Welcome to Cage Tracker',
        vote_average: 10,
        release_date: 'the future',
        tagline: 'Im gonna take your face... off!',
        title: 'Face Off'
      }];
    const expected = movies;
    const results = moviesReducer(undefined, actions.addMovies(movies));

    expect(results).toEqual(expected);
  });

  // it('should return an email address that is an empty string', () => {
  //   const expected = { email: '' };
  //   const results = loginReducer(undefined, actions.logOut());

  //   expect(results).toEqual(expected);
  // });
});