import React from 'react';
import { shallow } from 'enzyme';
import FavoritesContainer from './';
import { createStore } from 'redux';
import rootReducer from '../../reducers';



describe('Favorites Container Test', () => {
  const store = createStore(rootReducer);

  it('should match the snapshot', () => {
    const wrapper = shallow(<FavoritesContainer store={store}/>);
    
    expect(wrapper).toMatchSnapshot();
  });

});
