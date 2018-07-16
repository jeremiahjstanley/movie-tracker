import React from 'react';
import { LoginForm } from './index.js';
import { shallow } from 'enzyme';


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

  it('should calls handleChange when the email field changes', () => {
    const wrapper = shallow(<LoginForm />);
    const spy = spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = { target: { value: 'NickCage@aol.com', name: 'email' } };
    wrapper.find('.email-input').simulate('change', mockEvent);

    expect(spy).toHaveBeenCalled();
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

});