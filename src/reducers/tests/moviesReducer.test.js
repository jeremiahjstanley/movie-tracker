import { moviesReducer } from '../moviesReducer.js';
import * as actions from '../../actions';

describe('Movies Reducter tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = [{ id: 14361,
      backdrop_path: '/q8yzwvVm9PjusRI2rTG8gGk5xBM.jpg',
      poster_path: '/rvVQmoGJiMSsi3otft411TtNxdO.jpg',
      overview: 'When mild-mannered Martin Harvey finds out that he has inherited a vintage yacht, he decides to take his family on a Caribbean vacation to retrieve the vessel. Upon arriving on a small island and realizing that the ship is in rough shape, Martin and his family end up with more than they bargained for as the roguish Captain Ron signs on to sail the boat to Miami. It doesn\'t take long before Ron\'s anything-goes antics get the Harveys into plenty of trouble.',
      vote_average: 10,
      release_date: '1992-09-18',
      tagline: 'Martin just wanted a nice, quiet family vacation. Instead, he got... Captain Ron',
      title: 'Captain Ron' }];
  });

  it('should return the initial state', () => {
    const expected = [{ id: 14361,
      backdrop_path: '/q8yzwvVm9PjusRI2rTG8gGk5xBM.jpg',
      poster_path: '/rvVQmoGJiMSsi3otft411TtNxdO.jpg',
      overview: 'When mild-mannered Martin Harvey finds out that he has inherited a vintage yacht, he decides to take his family on a Caribbean vacation to retrieve the vessel. Upon arriving on a small island and realizing that the ship is in rough shape, Martin and his family end up with more than they bargained for as the roguish Captain Ron signs on to sail the boat to Miami. It doesn\'t take long before Ron\'s anything-goes antics get the Harveys into plenty of trouble.',
      vote_average: 10,
      release_date: '1992-09-18',
      tagline: 'Martin just wanted a nice, quiet family vacation. Instead, he got... Captain Ron',
      title: 'Captain Ron' }];

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
    const expected = [movies[0], movies[1], ...initialState];
    const results = moviesReducer(undefined, actions.addMovies(movies));

    expect(results).toEqual(expected);
  });
});