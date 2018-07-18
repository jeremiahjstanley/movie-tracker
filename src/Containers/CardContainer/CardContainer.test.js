import React from 'react';
import { CardContainer, mapStateToProps, mapDispatchToProps } from './index.js';
import { shallow, mount } from 'enzyme';
import { fetchMovieData } from '../../helper/apiCalls';
import { movieCleaner } from '../../helper/helper';
import { addMovies } from '../../actions';

jest.mock('../../helper/apiCalls');
jest.mock('../../helper/helper');

describe('CardContainer', () => {
  let mockMovies;
  let mockFavorites;
  let mockCheckFavorites;
  let mockAddMovies
  let mockUser;
  let wrapper;

  beforeEach(() => {
    mockMovies = [{title:'ConAir', id:7, poster_path:'google.com'}];
    mockFavorites = [{title:'ConAir', movie_id:7}];
    mockUser = {email: 'nick@cage.com', name: 'Nick', id: 2}
    mockCheckFavorites = jest.fn();
    mockAddMovies = jest.fn();
    wrapper = shallow(
      <CardContainer 
        movies={mockMovies} 
        favorites={mockFavorites} 
        addMovies={mockAddMovies}
        checkFavorites={mockCheckFavorites}
        user={mockUser}
        />);
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke checkFavorites when favorite button is clicked', () => {
    wrapper.find('button').simulate('click');

    expect(mockCheckFavorites).toHaveBeenCalled();
  });

  it('when component is mounted, fetchMovieData is called with correct param', async () => {
    wrapper = shallow(<CardContainer movies={mockMovies} favorites={mockFavorites} addMovies={jest.fn()}/>);

    await expect(fetchMovieData).toHaveBeenCalled();
  });

  it('should add a favorite prop of true if the movie is in the favorites array with an movie_id property', () => {
    expect(mockMovies[0].favorite).toBe(true);
  });

  it('should add a favorite prop of true if the movie is in the favorites array with an id property', () => {
    mockFavorites = [{title:'ConAir', id:7}];

    wrapper = shallow(
      <CardContainer 
        movies={mockMovies} 
        favorites={mockFavorites} 
        addMovies={mockAddMovies}
        checkFavorites={mockCheckFavorites}
        user={mockUser}
        />);

    expect(mockMovies[0].favorite).toBe(true);
  });

  it('should add a favorite class to the movie if it is in the favorites array', () => {
    const expected = wrapper.find('.favorite').length

    expect(expected).toBe(1);
  });

  it('should add a movie-image class to all movies in the container', () => {
    mockMovies = [{title:'ConAir', id:7, poster_path:'google.com'}, {title:'National Treasure', id:8, poster_path:'bing.com'}];
    
    wrapper = shallow(
      <CardContainer 
        movies={mockMovies} 
        favorites={mockFavorites} 
        addMovies={mockAddMovies}
        checkFavorites={mockCheckFavorites}
        user={mockUser}
        />);

    const expected = wrapper.find('.movie-image').length

    expect(expected).toBe(2);
  });

  describe('mapStateToProps', () => {
    it('should return an object with user object, movies array, and favorites array', () => {
      const mockState = { login: {email: 'nick@cage.com', name: 'Nick', id: 2}, favorites: [{title: 'Con Air'}], movies: [{title: 'Con Air'}]};
      const expected = {favorites: [{title: 'Con Air'}], movies: [{title: 'Con Air'}], user: {email: 'nick@cage.com', id: 2, name: 'Nick'}}
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch with an addMovies action on page load', async () => {
      const mockAddMovies = jest.fn();
      wrapper = await shallow(<CardContainer movies={mockMovies} favorites={mockFavorites} addMovies={mockAddMovies}/>);
      await wrapper.update();
      expect(mockAddMovies).toHaveBeenCalled();
    });
  });
});
