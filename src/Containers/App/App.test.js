import React from 'react';
import { App } from '../App';
import { shallow } from 'enzyme';

describe('App tests', () => {
  it('should return true', () => {
    expect('true').toEqual('true');
  });

  it('should return a favorite if the id is found', () => {
    const mockMovies = [{ title: 'ConAir', id: 7, poster_path: 'google.com' }];
    const mockFavorites = [{ title: 'ConAir', movie_id: 9, id:7 }];
    const wrapper = shallow(<App favorites={mockFavorites} movies={mockMovies}/>, { disableLifecycleMethods: true });

    const results = wrapper.instance().checkFavorites(7);

    expect(results).toEqual('taco');
  });
});