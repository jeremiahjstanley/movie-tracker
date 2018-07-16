import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.css';
import PropTypes from 'prop-types'

const FavoritesContainer = (props) => {
  const displayFavorites = props.favorites.map((favorite, index) => {
    return (
      <div>
        <Link to={`/movies/${favorite.title}`}>
          <div 
            className='favorite-card' 
            key={`${index} + ${favorite.title}`}
            style={ { backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${favorite.poster_path})` }}
          >
          </div>
        </Link>
        <button onClick={() => { props.checkFavorites(favorite.movie_id || favorite.id); }}>Unfavorite</button>
      </div>
    );
  });

  return (
    <div className='favorites-container'>
      { displayFavorites }
    </div>
  );
};

export const mapStateToProps = (state) => ({
  favorites: state.favorites
});

FavoritesContainer.propTypes = {
  checkFavorites: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired
}


export default connect(mapStateToProps)(FavoritesContainer);