import React from 'react';
import { CardContainer } from './index.js';
import { shallow, mount } from 'enzyme';


describe('CardContainer', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<CardContainer />);

    expect(wrapper).toMatchSnapshot();
  });
});
