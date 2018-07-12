import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../actions'



class LoginForm extends Component {
  constructor() {
    super()

    this.state = {
      userName: '',
      password: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitForm = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state.userName, this.state.password)
    this.setState({
      userName: '',
      password: ''
    })
  }

  render() {
    return(
      <form
        onSubmit={ this.submitForm }>
        <input
          type='text'
          name='userName'
          value={ this.state.userName }
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
  };
};

export const mapStateToDispatch = (dispatch) => {
  return {
    handleSubmit: (userName, password) => dispatch(logIn(userName, password))
  }
}

export default connect(null,mapStateToDispatch)(LoginForm)