import React, { Component } from 'react';
import CardContainer from '../CardContainer';
import './App.css';
import { NavLink, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieDetails from '../MovieDetails';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import FavoritesContainer from '../FavoritesContainer';
import { addFavorite, updateFavorites, logIn } from '../../actions';
import { sendFavoriteToDatabase, deleteFavoriteFromDatabase, getFavoritesFromDatabase } from '../../helper/apiCalls';


class App extends Component {

  componentDidMount() {
    this.getUser()
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

  checkFavorites = (id, event) => { 
    const favorite = this.props.favorites.find(favorite => {
      return favorite.id === id || favorite.movie_id === id; 
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
    return this.props.movies.find(movie => movie.id === id);
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
    console.log(movie.id, movie.movie_id)
    deleteFavoriteFromDatabase(movie.movie_id, this.props.users.id);
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
        <Route path='/favorites/' render={() => <FavoritesContainer checkFavorites={this.checkFavorites} />}/>
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
  logInUser: (email, name, id) => dispatch(logIn(email, name, id)),
  addToFavorites: (movie) => dispatch(addFavorite(movie)),
  updateFavorites: (movie) => dispatch(updateFavorites(movie)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
