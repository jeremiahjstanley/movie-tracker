import React from 'react';
import { shallow } from 'enzyme';
import MovieDetails from './';
import { createStore } from 'redux';
import rootReducer from '../../reducers';



describe('Movie details Test', () => {
  const store = createStore(rootReducer);
  
  it('should match the snapshot', () => {
    const wrapper = shallow(<MovieDetails 
      store={store} 
      title="ConAir" 
      backdrop_path="nickcage.com" release_date="yesterday"
      vote_average="10"
      tagline="welcome to cage tracker"
      poster_path="nickcage.com"
      overview="welcome to cage tracker"
      checkFavorites={jest.fn()}
      id="7" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke checkFavorites', () => {
    const checkFavoritesMock = jest.fn();
    const wrapper = shallow(<MovieDetails
      store={store}
      title="ConAir"
      backdrop_path="nickcage.com" release_date="yesterday"
      vote_average="10"
      tagline="welcome to cage tracker"
      poster_path="nickcage.com"
      overview="welcome to cage tracker"
      checkFavorites={checkFavoritesMock}
      id="7" />);

    const button = wrapper.find('.favorite-button');
    button.simulate('click');
    expect(checkFavoritesMock).toHaveBeenCalledWith('7');
  });

});