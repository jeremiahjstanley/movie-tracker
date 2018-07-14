import React, { Component } from 'react';
import CardContainer from '../CardContainer';
import './App.css';
import { NavLink, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieDetails from '../MovieDetails';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import FavoritesContainer from '../FavoritesContainer';
import { addFavorite, removeFavorite } from '../../actions';
import { sendFavoriteToDatabase, deleteFavoriteFromDatabase } from '../../helper/apiCalls';


class App extends Component {

  checkFavorites = (id) => { 
    const favorite = this.props.favorites.find(favorite => {
      return favorite.id === id || favorite.movie_id === id; 
    });
    if (!favorite) {
      const movie = this.props.movies.find(movie => movie.id === id);
      this.addFavorite(movie);
    } else {
      this.removeFavorite(favorite);
    }
  }

  addFavorite = (movie) => {
    if (this.props.users.email) {
      this.props.addToFavorites(movie);
      sendFavoriteToDatabase(movie, this.props.users.id);
    } else {
      this.props.history.push('/login');
    }
  }

  removeFavorite = (movie) => {
    const newFavorites = this.props.favorites.filter(favorite => favorite.id !== movie.id);
    this.props.removeFromFavorites(newFavorites);
    deleteFavoriteFromDatabase(movie.id, this.props.users.id);
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
        <Route path='/favorites/' component={FavoritesContainer}/>
        <Route path='/movies/:title' render={({match}) => {
          const movieToDisplay=this.props.movies.find(movie => movie.title === match.params.title);
          return <MovieDetails {...movieToDisplay} checkFavorites={this.checkFavorites}/>;
        }}/>
        <Route path='/login' component={LoginForm}/>
        <Route path='/signup' component={SignUpForm}/>
      <Route path='/' render={() => <CardContainer checkFavorites={this.checkFavorites}/>} />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  users: state.login,
  favorites: state.favorites
});

export const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (movie) => dispatch(addFavorite(movie)),
  removeFromFavorites: (movie) => dispatch(removeFavorite(movie))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
