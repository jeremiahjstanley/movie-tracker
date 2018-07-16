import React from 'react';
import { LoginForm, mapStateToProps, mapDispatchToProps } from './index.js';
import { shallow, mount } from 'enzyme';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';


describe('Login Form tests', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<LoginForm />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state of email, password and error message, all empty strings', () => {
    const wrapper = shallow(<LoginForm />);
    const expected = {
      email: '',
      password: '',
      errorMessage: ''
    };
    expect(wrapper.state()).toEqual(expected);
  });

  it('should update the state when handleChange is invoked', () => {
    const wrapper = shallow(<LoginForm />);

    const mockEvent = { target: { value: 'NickCage@aol.com', name: 'email' } };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('email')).toBe('NickCage@aol.com');
  });

  it('should invoke handleChange when the email field changes', () => {
    const wrapper = mount(withRouter(<LoginForm />), { disableLifecycleMethods: true });
    const spy = spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = { target: { value: 'NickCage@aol.com', name: 'email' } };
    wrapper.find('.email-input').simulate('change', mockEvent);

    expect(spy).toHaveBeenCalledWith();
  });

  

  // it('should calls handleChange when the password field changes', () => {
  //   const wrapper = shallow(<LoginForm />);
  //   const spy = spyOn(wrapper.instance(), 'handleChange');
  //   wrapper.instance().forceUpdate();
  //   const mockEvent = { target: { value: 'password', name: 'password' } };
  //   wrapper.find('.password-input').simulate('change', mockEvent);

  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should reset state after handle submit is called', () => {
    
  //   expect('').toEqual('');
  // });


  describe('mapStateToProps', () => {
    it('should return an object with the email, name and favorites array', () => {
      const mockState = { "favorites": [{ "title": "Con Air" }], "login": { "email": "nickcage@aol.com", "name": "Nick Cage" } };
      const expected = { "email": "nickcage@aol.com", "favorites": [{ "title": "Con Air" }], "name": "Nick Cage" };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {

  });

});