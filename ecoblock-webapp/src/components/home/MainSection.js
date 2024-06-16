import React from 'react';
import './MainSection.css';
import headImage from '../../assets/head.jpg';

const MainSection = () => {
  return (
    <main className="main-section">
      <div className="image-placeholder">
        <img src={headImage} alt="Header" className="head-img" />
      </div>
    </main>
  );
}

export default MainSection;
