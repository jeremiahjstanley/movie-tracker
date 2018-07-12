import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../actions';
import { fetchUser } from '../../helper/apiCalls'



class LoginForm extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitForm = async (e) => {
    e.preventDefault()
    const response = await fetchUser(this.state.email, this.state.password)
    console.log(response)
    
    this.props.handleSubmit(this.state.email, this.state.password)
    this.setState({
      email: '',
      password: ''
    })
  }

  render() {
    return(
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
  };
};

export const mapStateToDispatch = (dispatch) => {
  return {
    handleSubmit: (email, password) => dispatch(logIn(email, password))
  }
}

export default connect(null,mapStateToDispatch)(LoginForm)