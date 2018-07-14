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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetchUser(this.state.email.toLowerCase(), this.state.password);
    console.log(response);
    if (response) {
      this.props.submitForm(response.data.email, response.data.name, response.data.id);
      const favorites = await getFavoritesFromDatabase(response.data.id);
      this.props.getUserFavorites(favorites.data);
    } else {
      this.setState({
        errorMessage: 'Incorrect username or password'
      });
    }
    this.setState({
      email: '',
      password: ''
    });
  }

  logOutUser = () => {
    this.props.logOutUser();
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
          <h3> {this.state.errorMessage} </h3>
        </form>
      );
    } else {
      return (
        <div>
          <button
            onClick={this.props.logOutUser}> Logout </button>
        </div>
      );
    }
  }
}

export const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    name: state.login.name
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