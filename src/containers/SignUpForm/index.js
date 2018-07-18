import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '../../helper/apiCalls';
import { signUp } from '../../actions';
import './styles.css';

export class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
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
    const response = await createUser(this.state.name, this.state.email, this.state.password);
    if (response) {
      this.props.submitForm(this.state.name, this.state.email, response.id);
      this.setState({
        email: '',
        name: '',
        password: '',
        errorMessage: ''
      });
    }
    if (response.error) {
      this.setState({ 
        email: '',
        name: '',
        errorMessage: 'Email address already in use.'});
    }
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className='form'
      >
        <Link to='/' className='exit-form'>
          X
        </Link>
        <h1 className='form-header'>Sign Up</h1>
        <input
          className='name-field'
          aria-label='Please Enter Your Name'
          placeholder='name'
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          className='email-field'
          aria-label='Please Enter Your Email'
          placeholder='email'
          type='email'
          name='email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          className='password-field'
          aria-label='Please Enter Your Password'
          placeholder='password'
          type='password'
          name='password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button aria-label='Sign up for account'>
          Sign Up!
        </button>
        <h3> { this.state.errorMessage } </h3>
        <Link to='/login'>
            Have an exisiting account? Login here.
        </Link>
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

export const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (email, name, id) => dispatch(signUp(email, name, id))
  };
};

SignUpForm.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  submitForm: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);