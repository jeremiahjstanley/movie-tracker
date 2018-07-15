import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendFavoriteToDatabase, deleteFavoriteFromDatabase, getFavoritesFromDatabase } from '../../helper/apiCalls';
import { addFavorite, updateFavorites, logIn, logOut } from '../../actions';
import FavoritesContainer from '../FavoritesContainer';
import CardContainer from '../CardContainer';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import MovieDetails from '../MovieDetails';
import Header from '../Header'
import './styles.css';

class App extends Component {

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const { email, name, id } = user;
      this.props.logInUser(email, name, id);
      const results = await getFavoritesFromDatabase(id);
      const favorites = results.data.map(favorite => ({...favorite, favorite: true}));
      this.props.updateFavorites(favorites);
    } 
  }

  checkFavorites = (id) => { 
    const favorite = this.props.favorites.find(favorite => {
      return favorite.movie_id === id || favorite.id === id; 
    });
    if (!favorite) {
      const movie = this.findMovie(id);
      movie.favorite = true;
      this.addFavorite(movie);
    } else {
      const movie = this.findMovie(id);
      movie.favorite = false;
      this.removeFavorite(favorite);
    }
  }

  findMovie = (id) => {
    return this.props.movies.find(movie => movie.id === id || movie.movie_id === id);
  }

  addFavorite = (movie) => {
    if (this.props.users.email) {
      this.props.addToFavorites({...movie, favorite: true});
      sendFavoriteToDatabase(movie, this.props.users.id);
    } else {
      this.props.history.push('/login');
    }
  }

  removeFavorite = (movie) => {
    const newFavorites = this.props.favorites.filter(favorite => favorite.id !== movie.id);
    this.props.updateFavorites(newFavorites);
    deleteFavoriteFromDatabase(movie.movie_id || movie.id, this.props.users.id);
  }
  
  logOut = () => {
    const favorites = [];
    this.props.getUserFavorites(favorites);
    this.props.logOutUser();
    localStorage.removeItem('user');
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="app">
        <Header logOut={this.logOut}/>
        <Route path='/favorites/' render={() => <FavoritesContainer checkFavorites={this.checkFavorites} />}/>
        <Route path='/movies/:title' render={({match}) => {
          const movieToDisplay=this.props.movies.find(movie => movie.title === match.params.title);
          return <MovieDetails {...movieToDisplay} checkFavorites={this.checkFavorites}/>;
        }}/>

        <Route exact path='/login' component={LoginForm}/>
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
  logInUser: (email, name, id) => dispatch(logIn(email, name, id)),
  logOutUser: () => dispatch(logOut()),
  addToFavorites: (movie) => dispatch(addFavorite(movie)),
  getUserFavorites: (favorites) => dispatch(updateFavorites(favorites)),
  updateFavorites: (movie) => dispatch(updateFavorites(movie)),
});

App.propTypes = {
  logInUser: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  getUserFavorites: PropTypes.func.isRequired,
  updateFavorites: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  users: PropTypes.object,
  favorites: PropTypes.array.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
