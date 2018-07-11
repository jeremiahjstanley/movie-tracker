import React, { Component } from 'react';
import './App.css';
import fetchMovieData from './apiCalls';
import { apiKey } from './apiKey';
import { movieCleaner } from './helper';
import { connect } from 'react-redux';
import { addMovies } from './actions';

class App extends Component {

  componentDidMount = async () => {
    const movies = await fetchMovieData(apiKey);
    const cleanMovies = await movieCleaner(movies);
    this.props.addMovies(cleanMovies);
  }

  render() {
    return (
      <div className="App">
        hello world
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
