import React, { useState, useEffect } from 'react';
import './Header.css';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';
import { clearToken } from '../../services/authServices';
import { isAuthenticated } from '../../utils/authUtils';
import { slide as Menu } from 'react-burger-menu';

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(isAuthenticated());
  }, []);

  const handleDisconnect = () => {
    clearToken();
    setIsConnected(false);
    window.location.href = '/';
  };

  return (
    <header className="header">
      <NavLink to="/" className="logo-link">
        <div className="logo-container">
          <Logo className="logo-svg" />
          <div className="logo-text">EcoBlocks</div>
        </div>
      </NavLink>
      <nav className="nav">
        <NavLink to="/product" activeClassName="active">Product</NavLink>
        <NavLink to="/learn" activeClassName="active">Learn</NavLink>
        <NavLink to="/devblog" activeClassName="active">DevBlog</NavLink>
        {isConnected && (
          <NavLink to="/profile" activeClassName="active">Profile</NavLink>
        )}
        {isConnected && (
          <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
        )}
      </nav>
      <Menu right className="burger-menu">
        <NavLink to="/product" activeClassName="active" className="menu-item">Product</NavLink>
        <NavLink to="/learn" activeClassName="active" className="menu-item">Learn</NavLink>
        <NavLink to="/devblog" activeClassName="active" className="menu-item">DevBlog</NavLink>
        {isConnected && (
          <>
            <NavLink to="/profile" activeClassName="active" className="menu-item">Profile</NavLink>
            <NavLink to="/dashboard" activeClassName="active" className="menu-item">Dashboard</NavLink>
            <button onClick={handleDisconnect} className="menu-item disconnect-button">Disconnect</button>
          </>
        )}
        {!isConnected && (
          <NavLink to="/auth" activeClassName="active" className="menu-item">Connect</NavLink>
        )}
      </Menu>
      <div className="connect-container">
        {isConnected ? (
          <button onClick={handleDisconnect} className="disconnect-button">Disconnect</button>
        ) : (
          <NavLink to="/auth" className="connect-button">Connect</NavLink>
        )}
      </div>

    </header>
  );
}

export default Header;
