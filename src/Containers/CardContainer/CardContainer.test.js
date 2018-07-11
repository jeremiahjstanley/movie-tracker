import React from 'react';
import CardContainer from './';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';

const store = createStore(jest.fn().mockImplementation(() => {
  let state = {movies: []};
}))

describe('CardContainer', () => {
  it('should match the snapshot', () => {
    const wrapper = mount(<CardContainer store={store} />)

    expect(wrapper).toMatchSnapshot()
  })
})
