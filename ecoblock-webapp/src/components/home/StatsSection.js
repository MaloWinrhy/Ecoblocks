import React from 'react';
import './StatsSection.css';

const StatsSection = () => {
  return (
    <section className="stats-section">
      <h2>EcoBlocks: Revolutionizing Environmental Data Collection</h2>
      <p>EcoBlocks leverages blockchain and IoT technologies to provide accurate and reliable environmental data, promoting sustainable practices and smart city solutions.</p>
      <div className="stats">
        <div className="stat">
          <h3>50+</h3>
          <p>IoT Devices Deployed Globally</p>
        </div>
        <div className="stat">
          <h3>10K+</h3>
          <p>Environmental Data Points Collected Daily</p>
        </div>
        <div className="stat">
          <h3>95%</h3>
          <p>Data Accuracy and Reliability</p>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
