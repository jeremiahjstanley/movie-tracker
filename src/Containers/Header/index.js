import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './resources/logo.png'
import './styles.css'

class Header extends Component {

  render() {
    return (
        <header className='app-header'>
        <img src={logo} className='logo'/>
        <ul className='navigation-links'>
          <li>
            <NavLink to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login'>
              { this.props.users.id ? <a onClick={ this.props.logOut }>Logout</a> : 'Login'}
            </NavLink>
          </li>
          <li>
            <NavLink to='/favorites'>
              { this.props.favorites.length ? 'Favorites' : ''}
            </NavLink>
          </li>
        </ul>
    </header>
    )
  }
}

export const mapStateToProps = (state) => ({
  users: state.login,
  favorites: state.favorites
});

export default withRouter(connect(mapStateToProps)(Header));
