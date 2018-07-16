import React from 'react';
import { shallow } from 'enzyme';
import { FavoritesContainer } from './';


describe('Favorites Container Test', () => {

  it('should match the snapshot', () => {
    const mockFavorites = [{favorite:true, title:'ConAir'}];
    const wrapper = shallow(<FavoritesContainer favorites={mockFavorites}/>);
    
    expect(wrapper).toMatchSnapshot();
  });

  it('should render all the cards', () => {
    const mockFavorites = [{ favorite: true, title: 'ConAir' }, { favorite: true, title: 'The Rock' }];
    const wrapper = shallow(<FavoritesContainer favorites={mockFavorites} />);
    const results = wrapper.find('.favorite-card').length;
    
    expect(results).toEqual(2);
  });

  it('should invoke checkFavorites with the movie_id when favorite button is clicked', () => {
    const mockFavorites = [{ favorite: true, title: 'ConAir', movie_id: 5 }];
    const mockCheckFavorites = jest.fn();
    const wrapper = shallow(<FavoritesContainer favorites={mockFavorites} checkFavorites={mockCheckFavorites}/>);

    wrapper.find('button').simulate('click');

    expect(mockCheckFavorites).toHaveBeenCalledWith(5);
  });

  it('should invoke checkFavorites with the id when favorite button is clicked', () => {
    const mockFavorites = [{ favorite: true, title: 'ConAir', id: 5 }];
    const mockCheckFavorites = jest.fn();
    const wrapper = shallow(<FavoritesContainer favorites={mockFavorites} checkFavorites={mockCheckFavorites}/>);

    wrapper.find('button').simulate('click');

    expect(mockCheckFavorites).toHaveBeenCalledWith(5);
  });

});
