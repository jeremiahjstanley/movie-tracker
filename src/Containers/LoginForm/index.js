import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn, logOut, getSavedFavorites } from '../../actions';
import { fetchUser, getFavoritesFromDatabase } from '../../helper/apiCalls';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
  }


  storeUser = (email, name, id) => {
    const user = { email, name, id };
    localStorage.setItem('user', JSON.stringify(user));
  }

  logOut = () => {
    const favorites = [];
    this.props.getUserFavorites(favorites);
    this.props.logOutUser();
    localStorage.removeItem('user');
    this.props.history.push('/');
  }
  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetchUser(this.state.email.toLowerCase(), this.state.password);
    if (response) {
      const { email, name, id } = response.data;
      this.storeUser(email, name, id)
      this.props.submitForm(email, name, id);
      const results = await getFavoritesFromDatabase(id);
      const favorites = results.data.map(favorite => ({...favorite, favorite: true}));
      this.props.getUserFavorites(favorites);
      this.props.history.push('/');
    } else {
      this.setState({
        email: '',
        password: '',
        errorMessage: 'Incorrect username or password'
      });
    }
    
  }

  render() {
    if (!this.props.email) {
      return (
        <form
          onSubmit={ this.handleSubmit}>
          <input
            type='text'
            name='email'
            value={ this.state.email }
            onChange={ this.handleChange }
          />
          <input
            type='password'
            name='password'
            value={ this.state.password }
            onChange={ this.handleChange }
          />
          <button>Login</button>
          <h3> { this.state.errorMessage } </h3>
        </form>
      );
    } else {
      return (
        <div>
          <button
            onClick={ this.logOut }> Logout </button>
        </div>
      );
    }
  }
}

export const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    name: state.login.name,
    favorites: state.favorites
  };
};

export const mapStateToDispatch = (dispatch) => {
  return {
    getUserFavorites: (favorites) => dispatch(getSavedFavorites(favorites)),
    submitForm: (email, name, id) => dispatch(logIn(email, name, id)),
    logOutUser: () => dispatch(logOut())
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(LoginForm);