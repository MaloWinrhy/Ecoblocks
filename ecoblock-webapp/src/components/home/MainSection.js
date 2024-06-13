import React from 'react';
import './MainSection.css';
import headImage from '../../assets/head.jpg';

const MainSection = () => {
  return (
    <main className="main-section">
      <div className="image-placeholder">
        <img src={headImage} alt="Header" className="head-img" />
      </div>
      <div className="subscribe-section">
        <h2>Subscribe to our newsletter</h2>
        <p>Some more info in a paragraph supporting the headline, explaining the specific issue you solve for your customers.</p>
      </div>
    </main>
  );
}

export default MainSection;
