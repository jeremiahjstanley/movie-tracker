import React from 'react';
import { LoginForm } from './index.js';
import { shallow } from 'enzyme';


describe('Login Form tests', () => {
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
});