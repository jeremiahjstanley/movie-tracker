import React from 'react';
import { CardContainer, mapDispatchToProps } from './index.js';
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
  let wrapper;

  beforeEach(() => {
    mockMovies = [{title:'ConAir', id:7, poster_path:'google.com'}];
    mockFavorites = [{title:'ConAir', movie_id:7}];
    mockCheckFavorites = jest.fn();
    wrapper = shallow(<CardContainer movies={mockMovies} favorites={mockFavorites} checkFavorites={mockCheckFavorites} />, { disableLifecycleMethods: true });
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

  it('should add a favorite prop of true if the movie is in the favorites array', () => {
    expect(mockMovies[0].favorite).toBe(true);
  });

  it.only('calls dispatch with an addMovies action on page load', async () => {
    const mockAddMovies = jest.fn();
    wrapper = await shallow(<CardContainer movies={mockMovies} favorites={mockFavorites} addMovies={mockAddMovies}/>);
    await wrapper.update();
    expect(mockAddMovies).toHaveBeenCalledTimes(1);
  });
});
