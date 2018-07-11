import React, { Component } from 'react';
import fetchMovieData from '../../helper/apiCalls';
import { apiKey } from '../../helper/apiKey';
import { movieCleaner } from '../../helper/helper';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Card from '../../Components/Card';
import { addMovies } from '../../actions';

class CardContainer extends Component {

  componentDidMount = async () => {
    const movies = await fetchMovieData(apiKey);
    const cleanMovies = await movieCleaner(movies);
    this.props.addMovies(cleanMovies);
  }

  moviesToDisplay = (movies) => {
    return movies.map(movie => {
      return (
        <Link to={`/movies/${movie.title}`}>
          <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.movieImage}`} width="200px"/>
        </Link>
      )
    })
  } 

  render() {
    
    return (
      <div>
        { this.moviesToDisplay(this.props.movies) }
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies
});

export const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies))
});


export default connect(mapStateToProps,mapDispatchToProps)(CardContainer);
