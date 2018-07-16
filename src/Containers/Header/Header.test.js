import React from 'react';
import { Header } from './index.js';
import { shallow } from 'enzyme';

describe('Header', () => {
  let wrapper;
  let mockLogOut;

  beforeEach(() => {
    mockLogOut = jest.fn();
    wrapper = shallow(<Header users={{ id: 7 }} favorites={['Happy birthday Casey Poe']} logOut={ mockLogOut } />)
  });

  it('should match the snapshot when there is a user', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when there is no user', () => {
    const mockUser = {};
    wrapper = shallow(<Header users={mockUser} favorites={[]} logOut={mockLogOut} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call logOut when logOut button is clicked', () => {
    wrapper.find('.log-out').simulate('click');
    expect(mockLogOut).toHaveBeenCalled();
  });
});
