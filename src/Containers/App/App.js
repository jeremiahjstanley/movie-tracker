import React, { Component } from 'react';
import './App.css';
import CardContainer from '../Containers/CardContainer';
import MovieDetails from '../MovieDetails';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

class App extends Component {

  render() {
    console.log()
    return (
      <div className="App">

          Hello World
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies
});



export default connect(mapStateToProps)(App);
