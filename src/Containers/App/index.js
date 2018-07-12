import React, { Component } from 'react';
import CardContainer from '../CardContainer';
import './App.css';
import { NavLink, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieDetails from '../MovieDetails';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import { addFavorite } from '../../actions';
import { sendFavoriteToDatabase } from '../../helper/apiCalls';


class App extends Component {

  addFavorite = (id) => {
    console.log(this.props.users);
    const movieToFave = this.props.movies.find(movie => movie.id === id);
    this.props.addToFavorites(movieToFave);
    sendFavoriteToDatabase(movieToFave, this.props.users.id);
  }
  
  render() {
    return (
      <div className="App">

        <header className="app-header">
          <NavLink to='/login'>
            Login/LogOut
          </NavLink>
          <NavLink to='/signup'>
            SignUp
          </NavLink>
          <NavLink to='/favorites'>
            favorites
          </NavLink>
        </header>

        <Route path='/movies/:title' render={({match}) => {
          const movieToDisplay=this.props.movies.find(movie => movie.title === match.params.title);
          return <MovieDetails {...movieToDisplay} addToFavorites={this.addFavorite}/>;
        }}/>
        <Route path='/login' component={LoginForm}/>
        <Route path='/signup' component={SignUpForm}/>
        <Route path='/' component={CardContainer}/> 
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  users: state.login
});

export const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (movie) => dispatch(addFavorite(movie))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
