import React, { useState } from 'react';
import './PresentationSection.css';

const PresentationSection = () => {
  const [clickedIndex, setClickedIndex] = useState(1);

  const handleSquareClick = (index) => {
    setClickedIndex(index);
  };

  return (
    <section className="presentation-section">
      <h2 className="section-title">Explore the Core Features of EcoBlocks</h2>
      <div className="square-section">
        {[
          {
            title: 'Data Collection',
            description: 'Collect environmental data using IoT devices. Our system ensures accurate and real-time data gathering from various environmental sensors. These devices help monitor air quality, temperature, humidity, and other critical environmental parameters essential for research and analysis.'
          },
          {
            title: 'Mobile App',
            description: 'Manage your devices and data with our mobile app. The EcoBlocks app provides a user-friendly interface to configure, monitor, and control your IoT devices. It also offers insights and analytics on the collected data, helping you make informed decisions to improve environmental conditions.'
          },
          {
            title: 'Blockchain Integration',
            description: 'Ensure data integrity with blockchain technology. By integrating blockchain, we guarantee that the data collected is immutable and transparent. This adds an extra layer of security and trust, making sure that the environmental data is reliable and tamper-proof.'
          }
        ].map((item, index) => (
          <div
            key={index}
            className={`square ${clickedIndex === index ? 'clicked' : ''}`}
            onClick={() => handleSquareClick(index)}
          >
            <h3>{item.title}</h3>
            {clickedIndex === index && <p>{item.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default PresentationSection;
