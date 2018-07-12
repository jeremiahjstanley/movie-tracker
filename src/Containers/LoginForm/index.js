import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../actions';
import { fetchUser } from '../../helper/apiCalls';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const response = await fetchUser(this.state.email, this.state.password);
    
    this.props.handleSubmit(response.data.email, response.data.name);
    this.setState({
      email: '',
      password: ''
    });
  }

  render() {
    return (
      <form
        onSubmit={ this.submitForm }>
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
      </form>
    );
  }
}

export const mapStateToDispatch = (dispatch) => {
  return {
    handleSubmit: (email, name) => dispatch(logIn(email, name))
  };
};

export default connect(null,mapStateToDispatch)(LoginForm);