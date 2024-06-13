import React from 'react';
import './Footer.css';
import { ReactComponent as Logo } from '../../assets/logo.svg'; // Assurez-vous que le logo SVG est dans le bon chemin

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
            <a href="#howitworks">How it works</a>
            <a href="#featured">Featured</a>
            <a href="#partnership">Partnership</a>
            <a href="#business">Business Relation</a>
          </div>
          <div className="footer-section">
            <h3>Community</h3>
            <a href="#events">Events</a>
            <a href="#blog">Blog</a>
            <a href="#podcast">Podcast</a>
            <a href="#invite">Invite a friend</a>
          </div>
          <div className="footer-section">
            <h3>Socials</h3>
            <a href="#discord">Discord</a>
            <a href="#instagram">Instagram</a>
            <a href="#twitter">Twitter</a>
            <a href="#facebook">Facebook</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>©2022 Company Name. All rights reserved</p>
        <div className="footer-terms">
          <a href="#privacy">Privacy & Policy</a>
          <a href="#terms">Terms & Condition</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
