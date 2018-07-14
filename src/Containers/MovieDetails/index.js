import React from 'react';
import PropTypes from 'prop-types';


const MovieDetails = ({title, backdrop_path, release_date, vote_average, tagline, poster_path, overview, checkFavorites, id}) => { 
  return (
    <div style={ { backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${backdrop_path})`, backgroundSize: 'contain' } }>
      <h1>{title}</h1>
      <h3>{tagline}</h3>
      <p>{overview}</p>
      <button className="favorite-button" onClick={()=>{ checkFavorites(id); }}>
        Favorite
      </button>
      <h4>{vote_average}</h4>
      <h4>{release_date}</h4>
    </div>
  );
};

MovieDetails.propTypes = {
  title: PropTypes.string,
  backdrop: PropTypes.string,
  releaseDate: PropTypes.string,
  rating: PropTypes.number,
  tagline: PropTypes.string,
  movieImage: PropTypes.string,
  overview: PropTypes.string,
  favorite: PropTypes.bool
};

export default MovieDetails;