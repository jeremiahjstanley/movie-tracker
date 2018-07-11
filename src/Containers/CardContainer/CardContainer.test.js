import React from 'react';
import CardContainer from './';
import { shallow } from 'enzyme';

describe('CardContainer', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<CardContainer />)

    expect(wrapper).toMatchSnapshot()
  })
})
