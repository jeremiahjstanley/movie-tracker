import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from './resources/logo.png';
import './styles.css';

export class Header extends Component {

  render() {
    return (
      <header className='app-header'>
        <img src={logo} className='logo' alt='Cage Tracker Logo'/>
        <p className='user-name'>{this.props.users.name ? `Hey! Welcome to Cage Tracker ${this.props.users.name}!!` : ''}</p>
        <ul className='navigation-links'>
          <li>
            <NavLink className='home-link' to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className='login-link' to='/login'>
              { this.props.users.id ? <a className='log-out' onClick={ this.props.logOut }>Logout</a> : 'Login'}
            </NavLink>
          </li>
          <li>
            <NavLink className='favorites-link' to='/favorites'>
              { this.props.favorites.length ? 'Favorites' : ''}
            </NavLink>
          </li>
        </ul>
      </header>
    );
  }
}

export const mapStateToProps = (state) => ({
  users: state.login,
  favorites: state.favorites
});

Header.propTypes = {
  users: PropTypes.object,
  favorites: PropTypes.array.isRequired,
  logOut: PropTypes.func
};


export default withRouter(connect(mapStateToProps)(Header));
