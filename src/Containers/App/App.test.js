import React from 'react';
import { App } from '../App';
import { shallow } from 'enzyme';
import { deleteFavoriteFromDatabase } from '../../helper/apiCalls';

jest.mock('../../helper/apiCalls');

describe('App tests', () => {

  it.only('should invoke deleteFavorite if the id is found', () => {
    const mockMovies = [{ title: 'ConAir', id: 7, poster_path: 'google.com' }];
    const mockFavorites = [{ title: 'ConAir', movie_id: 7, id:7 }];
    const mockUser = {id:2};
    const wrapper = shallow(<App favorites={mockFavorites} movies={mockMovies} updateFavorites={jest.fn()} users={mockUser}/>, { disableLifecycleMethods: true });

    const results = wrapper.instance().checkFavorites(7);

    expect(wrapper.instance().removeFavorite()).toHaveBeenCalled();
  });
});