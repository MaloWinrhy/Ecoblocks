import React, { useState, useEffect } from 'react';
import './Header.css';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';
import { getToken, clearToken } from '../../services/authServices';

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsConnected(true);
    }
  }, []);

  const handleDisconnect = () => {
    clearToken();
    setIsConnected(false);
    window.location.href = '/';
  };

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
      {/* Connect/Disconnect button */}
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
