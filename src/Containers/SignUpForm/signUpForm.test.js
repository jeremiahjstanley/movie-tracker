import React from 'react';
import { SignUpForm } from './index.js';
import { shallow, mount } from 'enzyme';



describe('SignUp Form tests', () => {
  it('should have a default state of email, name and password, all empty strings', () => {
    const wrapper = shallow(<SignUpForm />);
    const expected = {
      email: '',
      name: '',
      password: ''
    };
    expect(wrapper.state()).toEqual(expected);
  });

  it('should invoke handleChange on change of the name field', () => {
    const wrapper = shallow(<SignUpForm />);
    const spy = spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = { target: { value: 'Nick Cage', name: 'name' } };
    wrapper.find('.name-input').simulate('change', mockEvent);

    expect(spy).toHaveBeenCalled();
  });

  it('should invoke handleChange on change of the email field', () => {
    const wrapper = shallow(<SignUpForm />);
    const spy = spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = { target: { value: 'nickcage@aol.com' } };
    wrapper.find('.email-input').simulate('change', mockEvent);

    expect(spy).toHaveBeenCalled();
  });

  it('should invoke handleChange on change of the password field', () => {
    const wrapper = shallow(<SignUpForm />);
    const spy = spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = { target: { value: 'password' } };
    wrapper.find('.password-input').simulate('change', mockEvent);
    wrapper.instance().forceUpdate();

    expect(spy).toHaveBeenCalled();
  });

  it('should update the state when handleChange is invoked', () => {
    const wrapper = shallow(<SignUpForm />);

    const mockEvent = { target: { value: 'Nick Cage', name: 'name' } };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('name')).toBe('Nick Cage');
  });

});