import React from 'react';
import { LoginForm, mapStateToProps, mapDispatchToProps } from './index.js';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { logIn, updateFavorites, getUserFavorites } from '../../actions';
import { getFavoritesFromDatabase, fetchUser } from '../../helper/apiCalls';
import localStorage from './localStorage';

window.localStorage = localStorage;

jest.mock('../../helper/apiCalls');

describe('Login Form tests', () => {
  let wrapper;
  let mockGetUserFavorites;
  let mockLogInUser;
  let mockHistory;
  let mockResponse;

  beforeEach(() => {

    mockGetUserFavorites = jest.fn();
    mockLogInUser = jest.fn();
    mockHistory = [];
    mockResponse = { 
      data: {
        name: 'Nick',
        email: 'nick@msn.com',
        id: 2
      }};
    wrapper = shallow(
      <LoginForm 
        getUserFavorites={mockGetUserFavorites}
        logInUser={mockLogInUser} 
        history={mockHistory}/>
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state of email, password and error message, all empty strings', () => {    
    const expected = {
      email: '',
      password: '',
      errorMessage: ''
    };
    expect(wrapper.state()).toEqual(expected);
  });

  it('should update the state when handleChange is invoked', () => {
    const mockEvent = { target: { value: 'NickCage@aol.com', name: 'email' } };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('email')).toBe('NickCage@aol.com');
  });

  it.skip('should invoke handleChange when the email field changes', () => {
    const wrapper = mount(<Router><LoginForm /></Router>);
    const spy = spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = { target: { value: 'NickCage@aol.com', name: 'email' } };
    wrapper.find('.email-input').simulate('change', mockEvent);

    expect(spy).toHaveBeenCalledWith();
  });

  it('should invoke handleSubmit when the form is submitted', () => {    
    const spy = spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.setState({
      email: 'nick@msn.com',
      password: 'unleashthecage'
    });

    const mockEvent = { preventDefault: jest.fn() };

    const submitButton = wrapper.find('.login-form');
    submitButton.simulate('submit', mockEvent);

    expect(spy).toHaveBeenCalledWith(mockEvent);
  });

  it.skip('should invoke handleUpdate when the form is submitted and fetch is successful', async() => {    
    const spy = spyOn(wrapper.instance(), 'handleUpdate');
    const mockEvent = { preventDefault: jest.fn() };
    const submitButton = wrapper.find('.login-form');
    submitButton.simulate('submit', mockEvent);

    await expect(spy).toHaveBeenCalled();
  });

  it('should invoke fetchUser with the correct params when handleSubmit is called', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    await wrapper.instance().handleSubmit(mockEvent);

    expect(fetchUser).toHaveBeenCalled();
  });

  // it('handleUpdate is called with the correct params', async () => {
  //   // const mockEvent = { preventDefault: jest.fn() }
  //   const mockResponse = { data: { email: 'nick@msn.com', name: 'Nick', id: 2, password: 'password' } }
  //   await wrapper.instance().handleUpdate(mockResponse)

  //   expect(handleUpdate).toHaveBeenCalled()
  // })

  it('should invoke storeUser with the correct arguments when the form is submitted', async () => {
    await wrapper.instance().storeUser('nick@msn.com', 'Nick', 2);

    expect(localStorage.store).toEqual({ user: '{"email":"nick@msn.com","name":"Nick","id":2}' });
  });

  it('should invoke logInUser with the correct arguments when the form is submitted', async () => {
    await wrapper.instance().handleUpdate(mockResponse);

    expect(mockLogInUser).toHaveBeenCalledWith('nick@msn.com', 'Nick', 2);
  });

  it('should fetch the users favorites from the database when the form is submitted', async () => {
    await wrapper.instance().handleUpdate(mockResponse);

    expect(getFavoritesFromDatabase).toHaveBeenCalledWith(2);
  });

  it('should invoke getUserFavorites when the form is submitted', async () => {
    await wrapper.instance().handleUpdate(mockResponse);

    expect(mockGetUserFavorites).toHaveBeenCalled();
  });

  it('should invoke apply a favorite property to the favorite movies returned from the database when the form is submitted', async () => {
    const mockArray = [{favorite: true, title: "Con Air"}, {favorite: true, title: "Face/Off"}, {favorite: true, title: "Captain Ron"}];

    await wrapper.instance().handleUpdate(mockResponse);

    expect(mockGetUserFavorites).toHaveBeenCalledWith(mockArray);
  });

  it('should redirect the user when the form is submitted', async () => {
    await wrapper.instance().handleUpdate(mockResponse);

    expect(mockHistory).toEqual(['/']);
  });

  describe('mapStateToProps', () => {
    it('should return an object with the email, name and favorites array', () => {
      const mockState = { favorites: [{ title: 'Con Air' }], login: { email: 'nickcage@aol.com', name: 'Nick Cage' } };
      const expected = { email: 'nickcage@aol.com', favorites: [{ title: 'Con Air' }], name: 'Nick Cage' };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch when the form is submitted to log the user in', () => { 
      const mockGetUserFavorites = jest.fn();
      const mockLogInUser = jest.fn();

      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const actionToDispatch = logIn('nickcage@aol.com', 'Nick', 1);
      mappedProps.logInUser('nickcage@aol.com', 'Nick', 1);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('calls dispatch when the form is submitted to retrieve the users favorites', () => { 
      const mockGetUserFavorites = jest.fn();
      const mockLogInUser = jest.fn();

      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const actionToDispatch = updateFavorites(['Con Air']);
      mappedProps.getUserFavorites(['Con Air']);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });

});