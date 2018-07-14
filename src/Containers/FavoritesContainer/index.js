import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.css';

const FavoritesContainer = (props) => {
  const displayFavorites = props.favorites.map((favorite, index) => {
    return (
      <div className='favorite' key={`${index} + ${favorite.title}`}>
        <Link to={`/favorites/${favorite.title}`}>
          <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${favorite.poster_path}`} width="200px"/>
        </Link>
        <button onClick={(event) => { props.checkFavorites(favorite.id, event); }}> **** </button>
      </div>
    );
  });

  return (
    <div className='favoritesContainer'>
      { displayFavorites }
    </div>
  );
};


export const mapStateToProps = (state) => ({
  favorites: state.favorites
});


export default connect(mapStateToProps)(FavoritesContainer);