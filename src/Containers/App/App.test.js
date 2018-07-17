import React from 'react';
import { mount, shallow } from 'enzyme';
import { logIn, logOut, addFavorite, updateFavorites, getUserFavorites } from '../../actions';
import { App, mapStateToProps, mapDispatchToProps } from '../App';
import { getFavoritiesFromDatabase, sendFavoriteToDatabase, deleteFavoriteFromDatabase } from '../../helper/apiCalls';
import { BrowserRouter } from 'react-router-dom';
// import localStorage from './localStorage';

// window.localStorage = localStorage;

jest.mock('../../helper/apiCalls');

describe('App tests', () => {
    let wrapper; 
    let mockFavorites;
    let mockMovies;
    let mockUser;
    let mockUpdateFavorites;
    let mockAddToFavorites;
    let mockHistory;
    let mockGetUserFavorites;
    let mockLogOutUser;

  beforeEach(() => {
    mockMovies = [{ title: 'ConAir', id: 7, poster_path: 'google.com' }, { title: 'FaceOff', id: 8, poster_path: 'bing.com' }];
    mockFavorites = [{ title: 'ConAir', movie_id: 7, id:7 }];
    mockUser = {email: 'nick@cage.com', name: 'Nick', id:2};
    mockUpdateFavorites = jest.fn()
    mockAddToFavorites = jest.fn()
    mockHistory = []
    mockGetUserFavorites = jest.fn()
    mockLogOutUser = jest.fn()

    wrapper = shallow(
      // <BrowserRouter>
      <App 
        favorites={mockFavorites}
        movies={mockMovies}
        users={mockUser}
        updateFavorites={mockUpdateFavorites}
        addToFavorites={mockAddToFavorites}
        history={mockHistory}
        getUserFavorites={mockGetUserFavorites}
        logOutUser={mockLogOutUser}
      />
      // </BrowserRouter>
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke getUser method on page load', async () => {
    const spy = spyOn(wrapper.instance(), 'getUser');
    
    wrapper.unmount()
    // wrapper.shallow()
    // wrapper.mount()
    // wrapper.instance().getUser()

    await expect(spy).toHaveBeenCalled()
  });

  it('should check to see if the user has favorites', async () => {
    wrapper.instance().getUser(7)

    const spy = spyOn(wrapper.instance(), 'findMovie');

    await expect(spy).toHaveBeenCalledWith(7)
  })

  it.only('should add a movie to the users favorites', async () => {
    wrapper.instance().checkFavorites(8)

    const spy = spyOn(wrapper.instance(), 'addFavorite');
    
    await expect(spy).toHaveBeenCalled()
  })

  it('should remove a movie from the users favorites', async () => {
    wrapper.instance().checkFavorites(7)

    const spy = spyOn(wrapper.instance(), 'removeFavorite');
    
    await expect(spy).toHaveBeenCalled()
  })

  it('should find a movie', () => {
    const results = wrapper.instance().findMovie(7)

    const expected = {id: 7, poster_path: 'google.com', title: 'ConAir'}
    
    expect(results).toEqual(expected)
  })

  it('should check for a favorite movie', () => {
    const expected = {favorite: true, id: 9, poster_path: 'bing.com', title: 'Face/Off'}
    
    wrapper.instance().checkFavorites(9)

    expect(mockAddToFavorites).toHaveBeenCalledWith(expected)
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
      />);
    const expected = {favorite: true, id: 8, poster_path: 'bing.com', title: 'Face/Off'}
    
    wrapper.instance().addFavorite(expected);

    expect(mockHistory).toEqual(['/login']);
  })

  it('should remove a movie from the favorites array', () => {
    const expected = {favorite: true, id: 8, poster_path: 'bing.com', title: 'Face/Off'}
    
    wrapper.instance().removeFavorite(expected);

    expect(mockUpdateFavorites).toHaveBeenCalledWith(mockFavorites);
  })

  it('should deleted a unfavorited movie from the database', () => {
    const expected = {favorite: true, id: 8, poster_path: 'bing.com', title: 'Face/Off'}
    
    wrapper.instance().addFavorite(expected);

    expect(deleteFavoriteFromDatabase).toHaveBeenCalledWith(expected.id, mockUser.id)
  })

  it('should call getUserFavorites with an empty array ', () => {
    wrapper.instance().logOut();

    expect(mockGetUserFavorites).toHaveBeenCalledWith([]);
  })

  it('should call logOutUser', () => {
    wrapper.instance().logOut()

    expect(mockLogOutUser).toHaveBeenCalled();
  })

  it('should redirect the user to the home screen', () => {
    wrapper.instance().logOut()

    expect(mockHistory).toEqual(['/']);
  })

  describe('mapStateToProps', () => {
    it('should return an object with user object and favorites array', () => {
      const mockState = { login: { email: 'nickcage@aol.com', name: 'Nick Cage', id: 1}, movies: [], favorites: []};
      const expected = {favorites: [], movies: [], users: {email: 'nickcage@aol.com', id: 1, name: 'Nick Cage'}}
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch when the form is submitted to log the user in', () => { 
      const mockGetUserFavorites = jest.fn();
      const mockLogInUser = jest.fn();

      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch)
      const actionToDispatch = logIn('nickcage@aol.com', 'Nick', 1)
      mappedProps.logInUser('nickcage@aol.com', 'Nick', 1)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch when the user clicks the logOut link', () => { 
      const mockGetUserFavorites = jest.fn();
      const mockLogInUser = jest.fn();

      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch)
      const actionToDispatch = logOut()
      mappedProps.logOutUser()

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch when adds a favorite', () => { 
      const mockGetUserFavorites = jest.fn();
      const mockLogInUser = jest.fn();

      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch)
      const actionToDispatch = addFavorite({title: 'Con Air'})
      mappedProps.addToFavorites({title: 'Con Air'})

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch when the form is submitted to retrieve the users favorites', () => { 
      const mockGetUserFavorites = jest.fn();
      const mockLogInUser = jest.fn();

      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch)
      const actionToDispatch = updateFavorites(['Con Air'])
      mappedProps.getUserFavorites(['Con Air'])

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch when a movie is favorited/unfavorited to update the favorites in the store', () => { 
      const mockGetUserFavorites = jest.fn();
      const mockLogInUser = jest.fn();

      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch)
      const actionToDispatch = updateFavorites(['Con Air'])
      mappedProps.updateFavorites(['Con Air'])

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  });
});