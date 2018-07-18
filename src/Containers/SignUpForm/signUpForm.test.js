import React from 'react';
import { SignUpForm, mapStateToProps, mapDispatchToProps } from './index.js';
import { shallow } from 'enzyme';
import { createUser } from '../../helper/apiCalls';
import { signUp } from '../../actions';

jest.mock('../../helper/apiCalls');


describe('SignUp Form tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUpForm />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state of email, name, password, and errorMessage all empty strings', () => {
    const expected = {
      email: '',
      name: '',
      password: '',
      errorMessage: ''
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

    await wrapper.instance().handleSubmit(mockEvent);
    expect(mockSubmitForm).toHaveBeenCalled();
  });

  it('should reset state to empty strings after form is submitted', async () => {
    const mockSubmitForm = jest.fn();
    const expected = {name: '', email: '', password: '', errorMessage: ''};
    wrapper = shallow(<SignUpForm submitForm={mockSubmitForm} />);
    wrapper.setState({
      email: 'nick@msn.com',
      name: 'nick',
      password: 'unleashthecage'
    });
    const mockEvent = { preventDefault: jest.fn() };

    await wrapper.instance().handleSubmit(mockEvent);
    const results = wrapper.state();

    expect(results).toEqual(expected);
  });

  describe('mapStateToProps', () => {
    it('should return an object with the email, name and favorites array', () => {
      const mockState = { login: { email: 'nickcage@aol.com', name: 'Nick Cage' } };
      const expected = { email: 'nickcage@aol.com', name: 'Nick Cage' };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch when the form is submitted to log the user in', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const actionToDispatch = signUp('nickcage@aol.com', 'Nick', 1);
      mappedProps.submitForm('nickcage@aol.com', 'Nick', 1);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });

});