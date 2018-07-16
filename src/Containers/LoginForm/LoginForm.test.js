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
});