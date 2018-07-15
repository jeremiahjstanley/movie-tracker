import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createUser } from '../../helper/apiCalls';
import { signUp } from '../../actions';
import './styles.css'

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      password: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createUser(this.state.name, this.state.email, this.state.password);
    console.log(response);
    this.props.submitForm(this.state.name, this.state.email, response.id);
    this.setState({
      email: '',
      name: '',
      password: ''
    });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className='sign-up-form'
      >
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
        <NavLink to='/login'>
            Have an exisiting account? Login here.
        </NavLink>
      </form>
    );
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
    submitForm: (email, name, id) => dispatch(signUp(email, name, id))
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(SignUpForm);