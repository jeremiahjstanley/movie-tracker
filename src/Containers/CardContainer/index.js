import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieData } from '../../helper/apiCalls';
import { apiKey } from '../../helper/apiKey';
import { movieCleaner } from '../../helper/helper';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMovies } from '../../actions';
import './styles.css';

export class CardContainer extends Component {

  componentDidMount = async () => {
    const movies = await fetchMovieData(apiKey);
    const cleanMovies = await movieCleaner(movies);
    this.props.addMovies(cleanMovies);
  }

  moviesToDisplay = (movies) => {
    console.log(this.props)
    return movies.map((movie, index) => {
      this.props.favorites.forEach(favorite => {
        if (favorite.movie_id === movie.id || favorite.id === movie.id) {
          movie.favorite = true;
        }
      });
      return (
        <div className='movie-card' key={movie + index}>
          <Link to={`/movies/${movie.title}`} >
            <div 
              className={movie.favorite ? 'favorite movie-image': 'movie-image'}
              key={`${index} + ${movie.title}`}
              style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path})`}}>
            </div> 
          </Link>
          <button 
            disabled={!this.props.user.email}
            onClick={() => {this.props.checkFavorites(movie.id)}}>Favorite</button>
        </div> 
      );
    });
  }

  render() {
    return (
      <div className='cardContainer'>
        { this.moviesToDisplay(this.props.movies) }
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  user: state.login,
  movies: state.movies,
  favorites: state.favorites
});

export const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies))
});

CardContainer.propTypes = {
  movies: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  addMovies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
