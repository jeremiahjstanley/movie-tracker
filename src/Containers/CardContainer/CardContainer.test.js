import React from 'react';
import { CardContainer } from './index.js';
import { shallow, mount } from 'enzyme';
import { fetchMovieData } from '../../helper/apiCalls';
import { movieCleaner } from '../../helper/helper';

jest.mock('../../helper/apiCalls')
jest.mock('../../helper/helper')

describe('CardContainer', () => {
  it('should match the snapshot', () => {
    const mockMovies = [{title:'ConAir', id:7, poster_path:'google.com'}];
    const mockFavorites = [{title:'ConAir', movie_id:9}];
    const wrapper = shallow(<CardContainer movies={mockMovies} favorites={mockFavorites} />, { disableLifecycleMethods: true });

    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke checkFavorites when favorite button is clicked', () => {
    const mockMovies = [{ title: 'ConAir', id: 7, poster_path: 'google.com' }];
    const mockFavorites = [{ title: 'ConAir', movie_id: 9 }];
    const mockCheckFavorites = jest.fn();
    const wrapper = shallow(<CardContainer movies={mockMovies} favorites={mockFavorites} checkFavorites={mockCheckFavorites} />, { disableLifecycleMethods: true });

    wrapper.find('button').simulate('click');

    expect(mockCheckFavorites).toHaveBeenCalled();
  });

  it('when component is mounted, fetchMovieData is called with correct param', async () => {
    const mockMovies = [{ title: 'ConAir', id: 7, poster_path: 'google.com' }];
    const mockFavorites = [{ title: 'ConAir', movie_id: 9 }];
    const wrapper = shallow(<CardContainer movies={mockMovies} favorites={mockFavorites} addMovies={jest.fn()}/>);

    await expect(fetchMovieData).toHaveBeenCalled()
  })
});
