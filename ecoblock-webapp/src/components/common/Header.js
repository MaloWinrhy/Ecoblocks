import React from 'react';
import './Header.css';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';

// Header component
const Header = () => {
  return (
    <header className="header">
      {/* Logo */}
      <NavLink to="/" className="logo-link">
        <div className="logo-container">
          <Logo className="logo-svg" />
          <div className="logo-text">EcoBlocks</div>
        </div>
      </NavLink>
      {/* Navigation */}
      <nav className="nav">
        <NavLink to="/product" activeClassName="active">Product</NavLink>
        <NavLink to="/learn" activeClassName="active">Learn</NavLink>
        <NavLink to="/devblog" activeClassName="active">DevBlog</NavLink>
      </nav>
      {/* Connect button */}
      <div className="connect-container">
        <a href="#connect" className="connect-button">Connect</a>
      </div>
    </header>
  );
}

export default Header;
