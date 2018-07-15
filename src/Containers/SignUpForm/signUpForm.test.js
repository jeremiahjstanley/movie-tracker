import React from 'react';
import SignUpForm from './';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

const store = createStore(rootReducer);


describe('SignUp Form tests', () => {
  it('should have a default state of email, name and password, all empty strings', () => {
    const wrapper = shallow(<SignUpForm store={store} />);
    expect(wrapper.state()).toEqual({});
  });

  it('should invoke handleChange on change', () => {
    const wrapper = mount(<SignUpForm store={store} />);
    const spy = spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = { target: { value: 'Nick Cage' } };
    wrapper.find('.name-input').simulate('change', mockEvent);

    expect(spy).toHaveBeenCalled();
  });

  it('should update the state when handleChange is invoked', () => {
    const wrapper = mount(<SignUpForm store={store} />);

    const mockEvent = { target: { value: 'Nick Cage', name: 'name' } };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state()).toEqual('9');
  });
});