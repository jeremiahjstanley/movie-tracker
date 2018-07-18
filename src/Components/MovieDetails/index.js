import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const MovieDetails = ({title, backdrop_path, release_date, vote_average, tagline, overview, checkFavorites, id}) => { 
  return (
    <div 
      className='detail-card'
      style={ { backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${backdrop_path})`} }
    >
      <div className='detail-text'>
        <h1 className='detail-heading'>{title}</h1>
        <h3 className='detail-heading'>{tagline}</h3>
        <p className='detail-overview'>{overview}</p>
        <button className="favorite-button" onClick={()=>{ checkFavorites(id); }}>
          Add to Favorites
        </button>
        <h4 className='detail-heading detail-inline'>Rating: {vote_average} | Released: {release_date}</h4>
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  title: PropTypes.string,
  backdrop_path: PropTypes.string,
  release_date: PropTypes.string,
  vote_average: PropTypes.number,
  tagline: PropTypes.string,
  overview: PropTypes.string,
  checkFavorites: PropTypes.func,
  id: PropTypes.number
};

export default MovieDetails;