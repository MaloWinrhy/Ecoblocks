import React from 'react';
import './Footer.css';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <Logo className="footer-logo-svg" />
          <div className="logo-text">EcoBlocks</div>
        </div>
        <div className="footer-links">
          <div className="footer-section">
            <h3>About</h3>
            <Link to="#howitworks">How it works</Link>
            <Link to="#featured">Featured</Link>
            <Link to="#partnership">Partnership</Link>
            <Link to="#business">Business Relation</Link>
          </div>
          <div className="footer-section">
            <h3>Community</h3>
            <Link to="#events">Events</Link>
            <Link to="#blog">Blog</Link>
            <Link to="#podcast">Podcast</Link>
            <Link to="#invite">Invite a friend</Link>
          </div>
          <div className="footer-section">
            <h3>Socials</h3>
            <Link to="#discord">Discord</Link>
            <Link to="#instagram">Instagram</Link>
            <Link to="#twitter">Twitter</Link>
            <Link to="#facebook">Facebook</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>©2024 EcoBlocks. All rights reserved</p>
        <div className="footer-terms">
          <Link to="/privacy">Privacy & Policy</Link>
          <Link to="/terms">Terms & Condition</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
