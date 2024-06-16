import React from 'react';
import './Header.css';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
return (
    <header className="header">
            <div className="logo-container">
            <Logo className="logo-svg" />
        <div className="logo-text">EcoBlocks</div>
        </div>
        <nav className="nav">
            <a href="#product">Product</a>
            <Link to="/learn">Learn</Link>
            <a href="#devblog">DevBlog</a>
        </nav>
        <div className="connect-container">
        <a href="#connect" className="connect-button">Connect your app</a>
    </div>
    </header>
);
}

export default Header;
