import React from 'react';
import { shallow } from 'enzyme';
import { FavoritesContainer, mapStateToProps } from './index';


describe('Favorites Container Test', () => {

  it('should match the snapshot when there are no favorites', () => {
    const mockFavorites = [];
    const wrapper = shallow(<FavoritesContainer favorites={mockFavorites} />);
    
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

  describe('mapStateToProps', () => {
    it('should return an object with user object and favorites array', () => {
      const mockState = { favorites: [{title: 'Con Air'}]};
      const expected = {favorites: [{title: 'Con Air'}]}
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

});
