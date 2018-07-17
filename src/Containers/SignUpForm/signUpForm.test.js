import React from 'react';
import { SignUpForm, mapStateToProps } from './index.js';
import { shallow, mount } from 'enzyme';
import { createUser } from '../../helper/apiCalls';

jest.mock('../../helper/apiCalls');


describe('SignUp Form tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUpForm />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state of email, name and password, all empty strings', () => {
    const expected = {
      email: '',
      name: '',
      password: ''
    };

    expect(wrapper.state()).toEqual(expected);
  });

  it('should update the state when handleChange is invoked', () => {
    const mockEvent = { target: { value: 'Nick Cage', name: 'name' } };

    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('name')).toBe('Nick Cage');
  });

  it('should invoke handleSubmit when the form is submitted', () => {
    const spy = spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.setState({
      email: 'nick@msn.com',
      name:'nick',
      password: 'unleashthecage'
    });

    const mockEvent = { preventDefault: jest.fn() };

    const submitButton = wrapper.find('form');
    submitButton.simulate('submit', mockEvent);

    expect(spy).toHaveBeenCalledWith(mockEvent);
  });

  it('should invoke createUser when form is submitted', async () => {
    const mockSubmitForm = jest.fn();
    wrapper = shallow(<SignUpForm submitForm={mockSubmitForm}/>);
    wrapper.setState({
      email: 'nick@msn.com',
      name: 'nick',
      password: 'unleashthecage'
    });
    const mockEvent = { preventDefault: jest.fn() };

    wrapper.instance().handleSubmit(mockEvent);

    expect(createUser).toHaveBeenCalledWith('nick', 'nick@msn.com', 'unleashthecage');
  });

  it('should invoke submitForm when the form is submitted', async () => {
    const mockSubmitForm = jest.fn();
    wrapper = shallow(<SignUpForm submitForm={mockSubmitForm} />);
    wrapper.setState({
      email: 'nick@msn.com',
      name: 'nick',
      password: 'unleashthecage'
    });
    const mockEvent = { preventDefault: jest.fn() };

    wrapper.instance().handleSubmit(mockEvent);
    wrapper.update();

    expect(mockSubmitForm).toHaveBeenCalled();
  });

  describe('mapStateToProps', () => {
    it('should return an object with the email, name and favorites array', () => {
      const mockState = { login: { email: 'nickcage@aol.com', name: 'Nick Cage' } };
      const expected = { email: 'nickcage@aol.com', name: 'Nick Cage' };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });


  it.skip('should invoke handleChange on change of the name field', () => {
    const spy = spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = { target: { value: 'Nick Cage', name: 'name' } };
    wrapper.find('.name-field').simulate('change', mockEvent);

    expect(spy).toHaveBeenCalled();
  });

  it.skip('should invoke handleChange on change of the email field', () => {
    const spy = spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = { target: { value: 'nickcage@aol.com' } };
    wrapper.find('.email-input').simulate('change', mockEvent);

    expect(spy).toHaveBeenCalled();
  });

  it.skip('should invoke handleChange on change of the password field', () => {
    const spy = spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = { target: { value: 'password' } };
    wrapper.find('.password-input').simulate('change', mockEvent);
    wrapper.instance().forceUpdate();

    expect(spy).toHaveBeenCalled();
  });

});