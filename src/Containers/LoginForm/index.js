import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logIn, updateFavorites } from '../../actions';
import { fetchUser, getFavoritesFromDatabase } from '../../helper/apiCalls';

export class LoginForm extends Component {
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
      this.props.logInUser(email, name, id);
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
    return (
      <form
        onSubmit={ this.handleSubmit}
        className='form login-form'
      >
        <Link to='/' className='exit-form'>
          X
        </Link>
        <h1 className='form-header'>Sign In</h1>
        <input
          className='email-field'
          aria-label='Please Enter Your Email'
          placeholder='email'
          type='text'
          name='email'
          value={ this.state.email }
          onChange={ this.handleChange }
        />
        <input
          className='password-field'
          aria-label='Please Enter Your Password'
          placeholder='password'
          type='password'
          name='password'
          value={ this.state.password }
          onChange={ this.handleChange }
        />
        <button aria-label='Sign in to your account'>
          Login
        </button>
        <h3> { this.state.errorMessage } </h3>
        <Link to='/signup'>
          Don't have an account?
        </Link>
      </form>
    );
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
    getUserFavorites: (favorites) => dispatch(updateFavorites(favorites)),
    logInUser: (email, name, id) => dispatch(logIn(email, name, id)),
  };
};

LoginForm.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  favorites: PropTypes.array.isRequired,
  getUserFavorites: PropTypes.func.isRequired,
  logInUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapStateToDispatch)(LoginForm);