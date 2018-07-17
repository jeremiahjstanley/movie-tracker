import React from 'react';
import { App } from '../App';
import { shallow } from 'enzyme';
import { sendFavoriteToDatabase, deleteFavoriteFromDatabase } from '../../helper/apiCalls';

jest.mock('../../helper/apiCalls');

describe('App tests', () => {
    let wrapper; 
    let mockFavorites;
    let mockMovies;
    let mockUser;
    let mockUpdateFavorites;
    let mockAddToFavorites;
    let mockHistory;

  beforeEach(() => {
    mockMovies = [{ title: 'ConAir', id: 7, poster_path: 'google.com' }];
    mockFavorites = [{ title: 'ConAir', movie_id: 7, id:7 }];
    mockUser = {email: 'nick@cage.com', name: 'Nick', id:2};
    mockUpdateFavorites = jest.fn()
    mockAddToFavorites = jest.fn()
    mockHistory = []

    wrapper = shallow(
      <App 
        favorites={mockFavorites}
        movies={mockMovies}
        users={mockUser}
        updateFavorites={mockUpdateFavorites}
        addToFavorites={mockAddToFavorites}
        history={mockHistory}
      />
    )
  })

  it('should match the snapshot', () => {

  })

  it('should invoke getUser method on cage load', () => {
    const spy = spyOn(wrapper.instance(), 'getUser');
    wrapper.instance()

    expect(spy).toHaveBeenCalled()
  })

  it('should set the user in local storage', () => {

  })

  it('should check to see if the user has favorites', () => {
    wrapper.instance().checkFavorites(7)

    const spy = spyOn(wrapper.instance(), 'findMovie');

    expect(spy).toHaveBeenCalledWith(7)
  })

  it('should check to see if the user has favorites', () => {
    wrapper.instance().checkFavorites(7)

    const spy = spyOn(wrapper.instance(), 'addFavorite');
    
    expect(spy).toHaveBeenCalled()
  })

  it('should check to see if the user has favorites', () => {
    wrapper.instance().checkFavorites(7)

    const spy = spyOn(wrapper.instance(), 'removeFavorite');
    
    expect(spy).toHaveBeenCalled()
  })

  it('should find a movie', () => {
    const results = wrapper.instance().findMovie(7)

    const expected = {id: 7, poster_path: 'google.com', title: 'ConAir'}
    
    expect(results).toEqual(expected)
  })

  it('should add a movie to the favorites array', () => {
    const expected = {favorite: true, id: 8, poster_path: 'bing.com', title: 'Face/Off'}
    
    wrapper.instance().addFavorite(expected)

    expect(mockAddToFavorites).toHaveBeenCalledWith(expected)
  })

  it('should store the users favorites in the database', () => {
    const expected = {favorite: true, id: 8, poster_path: 'bing.com', title: 'Face/Off'}
    
    wrapper.instance().addFavorite(expected)

    expect(sendFavoriteToDatabase).toHaveBeenCalledWith(expected, mockUser.id)
  })

  it('should promp the user to login attempt to add a favorited without being signed in', () => {
    mockUser = {};
    wrapper = shallow(
      <App 
        favorites={mockFavorites}
        movies={mockMovies}
        users={mockUser}
        updateFavorites={mockUpdateFavorites}
        addToFavorites={mockAddToFavorites}
        history={mockHistory}
      />)
    const expected = {favorite: true, id: 8, poster_path: 'bing.com', title: 'Face/Off'}
    
    wrapper.instance().addFavorite(expected)

    expect(mockHistory).toEqual(['/login'])
  })

  it('should remove a movie from the favorites array', () => {
    const expected = {favorite: true, id: 8, poster_path: 'bing.com', title: 'Face/Off'}
    
    wrapper.instance().removeFavorite(expected)

    expect(mockUpdateFavorites).toHaveBeenCalledWith(expected)
  })

  it('should deleted a unfavorited movie from the database', () => {
    const expected = {favorite: true, id: 8, poster_path: 'bing.com', title: 'Face/Off'}
    
    wrapper.instance().addFavorite(expected)

    expect(deleteFavoriteFromDatabase).toHaveBeenCalledWith(expected.id, mockUser.id)
  })
  // it.only('should invoke deleteFavorite if the id is found', () => {
  //   
  //   const wrapper = shallow(<App favorites={mockFavorites} movies={mockMovies} updateFavorites={jest.fn()} users={mockUser}/>, { disableLifecycleMethods: true });

  //   const results = wrapper.instance().checkFavorites(7);

  //   expect(wrapper.instance().removeFavorite()).toHaveBeenCalled();
  // });
});