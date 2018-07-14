import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const FavoritesContainer = (props) => {
  const displayFavorites = props.favorites.map((favorite, index) => {
    return (
      <div key={`${index} + ${favorite.title}`}>
        <Link to={`/favorites/${favorite.title}`}>
          <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${favorite.poster_path}`} width="200px"/>
        </Link>
        <button onClick={() => { props.checkFavorites(favorite.id); }}> **** </button>
      </div>
    );
  });

  return (
    <div>
      { displayFavorites }
    </div>
  );
};


export const mapStateToProps = (state) => ({
  favorites: state.favorites
});


export default connect(mapStateToProps)(FavoritesContainer);