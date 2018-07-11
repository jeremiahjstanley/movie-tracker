import React, { Component } from 'react';
import fetchMovieData from '../../apiCalls';
import { apiKey } from '../../apiKey';
import { movieCleaner } from '../../helper';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../../Components/Card';
import { addMovies } from '../../actions';

class CardContainer extends Component {

  componentDidMount = async () => {
    const movies = await fetchMovieData(apiKey);
    const cleanMovies = await movieCleaner(movies);
    this.props.addMovies(cleanMovies);
  }

  moviesToDisplay = ({ movies }) => {
    return movies.map(movie => {
      console.log(movie)
    }); 
  } 



  render() {
    return (
      <div>

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
