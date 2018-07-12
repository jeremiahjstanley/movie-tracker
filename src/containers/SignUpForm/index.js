import React, { Component } from 'react';
import { createUser } from '../../helper/apiCalls';

export default class SignUpForm extends Component {
  constructor() {
    super();

    this.state={
      email: '',
      name: '',
      password: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const response = await createUser(this.state.name, this.state.email, this.state.password);
  }

  render() {
    return (
      <form
        onSubmit={this.submitForm}>
        <input
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type='email'
          name='email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type='password'
          name='password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button>Sign Up!</button>
      </form>
    );
  }
}