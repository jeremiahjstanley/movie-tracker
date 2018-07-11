import React from 'react'


const MovieDetails = ({title, backdrop, releaseDate, rating, tagline, movieImage, overview, favorite}) => { 
  return (
    <div style={ { backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${backdrop})` } }>
      <h1>{title}</h1>
      <h3>{tagline}</h3>
      <p>{overview}</p>
      <button className={favorite}>
        Favorite
      </button>
      <h4>{rating}</h4>
      <h4>{releaseDate}</h4>
    </div>
  )
}

export default MovieDetails